# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-09-08
### Added
- ESM-only secondary build output under `@neovantis/mantisui/esm` with `preserveModules` for improved tree-shaking.
- `build:esm-only` script and inclusion in `prepublishOnly` workflow.
- `CHANGELOG.md` added to published files.

### Changed
- Upgraded toolchain: Rollup 4.x, TypeScript 5.5.x, updated React type packages.
- Node engine requirement raised to `>=18`.
- Peer dependency range widened to allow React 18 and 19.
- tsconfig modernized (ES2019 target, Bundler resolution, dropped allowJs).

### Fixed
- Ensured clean export map including new ESM path.

## [1.0.1] - 2025-09-08
### Changed
- Initial modernization of dependencies prior to 1.1.0 feature additions.

## [1.0.0] - 2025-??-??
- Initial release.
