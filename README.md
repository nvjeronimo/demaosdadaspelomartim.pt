# De mãos dadas pelo Martim

Site: https://demaosdadaspelomartim.pt (DreamHost) · pré-visualização: https://nvjeronimo.github.io/demaosdadaspelomartim.pt/

- Raiz: o site (gerado a partir de `mockup/` no projeto de trabalho com `sh tools/publish.sh`).
  - `eventos/`, `historia.html`, `mapa.html`, `organiza.html`, `cartaz.html`, `mural.html`, `brochura.html`, `privacidade.html`, `cookies.html`, `404.html`, `en/` (versão inglesa).
  - `docs/`: PDFs da brochura (PT e EN).
- `proposta/`: documento da proposta de redesign.
- `.github/workflows/deploy-dreamhost.yml`: cada push envia o site para a DreamHost por rsync (segredos `DH_HOST`, `DH_USER`, `DH_SSH_KEY`, `DH_PATH`).
