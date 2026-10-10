/*
      Safe auto-update strategy:
      - Ask npm for the latest package versions on each fresh page load.
      - Automatically accept compatible major version 4.x updates.
      - Refuse an unexpected future major version to avoid silent breaking changes.
      - Fall back to the pinned versions below if npm lookup fails.
    */
    const FALLBACK = {
      core: "4.2.0",
      common: "4.1.3",
      en: "4.1.1",
      es: "4.1.2",
      pt: "4.1.1",
      fr: "4.1.2",
      de: "4.1.1"
    };

    const PKGS = {
      core: "@zxcvbn-ts/core",
      common: "@zxcvbn-ts/language-common",
      en: "@zxcvbn-ts/language-en",
      es: "@zxcvbn-ts/language-es-es",
      pt: "@zxcvbn-ts/language-pt-br",
      fr: "@zxcvbn-ts/language-fr",
      de: "@zxcvbn-ts/language-de"
    };

    const EXPECTED_MAJOR = 4;

    async function npmLatest(pkg) {
      const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg)}`, {
        cache: "no-store"
      });
      if (!response.ok) throw new Error(`npm lookup failed for ${pkg}`);
      const data = await response.json();
      const version = data?.["dist-tags"]?.latest;
      if (!version) throw new Error(`No latest tag for ${pkg}`);
      const published = data?.time?.[version] || null;
      return { version, published };
    }

    function sameMajor(version) {
      return Number(String(version).split(".")[0]) === EXPECTED_MAJOR;
    }

    async function resolveVersions() {
      try {
        const [core, common, en, es, pt, fr, de] = await Promise.all([
          npmLatest(PKGS.core),
          npmLatest(PKGS.common),
          npmLatest(PKGS.en),
          npmLatest(PKGS.es),
          npmLatest(PKGS.pt),
          npmLatest(PKGS.fr),
          npmLatest(PKGS.de)
        ]);

        const found = { core, common, en, es, pt, fr, de };
        const compatible = Object.values(found).every(x => sameMajor(x.version));

        if (!compatible) {
          return {
            versions: { ...FALLBACK },
            published: {},
            status: "major-blocked",
            discovered: Object.fromEntries(Object.entries(found).map(([k,v]) => [k, v.version]))
          };
        }

        return {
          versions: Object.fromEntries(Object.entries(found).map(([k,v]) => [k, v.version])),
          published: Object.fromEntries(Object.entries(found).map(([k,v]) => [k, v.published])),
          status: "updated"
        };
      } catch (error) {
        console.warn("zxcvbn-ts auto-update check failed; using pinned fallback.", error);
        return { versions: { ...FALLBACK }, published: {}, status: "fallback" };
      }
    }

    function safeStorageGet(key) {
      try { return window.localStorage?.getItem(key) ?? null; }
      catch (error) { console.warn("Storage unavailable to estimator loader; continuing without saved preference.", error); return null; }
    }

    async function loadEstimator() {
      const resolved = await resolveVersions();
      const v = resolved.versions;

      const [
        corePackage,
        commonPackage,
        enPackage,
        esPackage,
        ptPackage,
        frPackage,
        dePackage
      ] = await Promise.all([
        import(`https://esm.sh/@zxcvbn-ts/core@${v.core}`),
        import(`https://esm.sh/@zxcvbn-ts/language-common@${v.common}`),
        import(`https://esm.sh/@zxcvbn-ts/language-en@${v.en}`),
        import(`https://esm.sh/@zxcvbn-ts/language-es-es@${v.es}`),
        import(`https://esm.sh/@zxcvbn-ts/language-pt-br@${v.pt}`),
        import(`https://esm.sh/@zxcvbn-ts/language-fr@${v.fr}`),
        import(`https://esm.sh/@zxcvbn-ts/language-de@${v.de}`)
      ]);

      const makeOptions = (langPackage) => ({
        translations: langPackage.translations,
        graphs: commonPackage.adjacencyGraphs,
        dictionary: {
          ...commonPackage.dictionary,
          ...langPackage.dictionary
        }
      });

      window.passwordEstimators = {
        en: new corePackage.ZxcvbnFactory(makeOptions(enPackage)),
        es: new corePackage.ZxcvbnFactory(makeOptions(esPackage)),
        pt: new corePackage.ZxcvbnFactory(makeOptions(ptPackage)),
        fr: new corePackage.ZxcvbnFactory(makeOptions(frPackage)),
        de: new corePackage.ZxcvbnFactory(makeOptions(dePackage))
      };

      window.zxcvbnPackageInfo = {
        ...resolved,
        packages: PKGS
      };

      const urlLang = new URLSearchParams(location.search).get("lang");
      const saved = safeStorageGet("passwordStrengthLanguage");
      const browserLangs = Array.isArray(navigator.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator.language || "en"];
      const detectSupported = () => {
        for (const raw of browserLangs) {
          const lang = String(raw).toLowerCase();
          if (lang.startsWith("es")) return "es";
          if (lang.startsWith("pt")) return "pt";
          if (lang.startsWith("fr")) return "fr";
          if (lang.startsWith("de")) return "de";
          if (lang.startsWith("en")) return "en";
        }
        return "en";
      };
      const preferred = ["en","es","pt","fr","de"].includes(urlLang) ? urlLang : (["en","es","pt","fr","de"].includes(saved) ? saved : detectSupported());
      window.passwordEstimator = window.passwordEstimators[preferred];
      window.dispatchEvent(new Event("password-estimator-ready"));
    }

    loadEstimator().catch(error => {
      console.error("Unable to load zxcvbn-ts.", error);
      window.zxcvbnLoadError = String(error);
      window.dispatchEvent(new Event("password-estimator-error"));
    });
