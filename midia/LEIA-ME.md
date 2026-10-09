# midia/

Arquivos que precisam de **URL pública** para a API do Instagram.

A Meta não aceita upload: ela faz um `GET` na `image_url` que a gente manda. Então a arte
tem que estar acessível sem login. Este repositório é público, e o raw do GitHub serve:

    https://raw.githubusercontent.com/CaioRPeres/mr-mimic-site/main/midia/instagram/<arquivo>

Nada aqui entra no tema da Nuvemshop — `build.py` só olha `src/` e `dist/`.

Publicar: `Mr Mimic Site/instagram/publicar.py` (ver `META-API-STORIES.md`).
