# REALIZA Agro — landing de fazendas

Site em Next.js (App Router) + Tailwind v4. Fazendas, mapa, simulador, formulário de leads e painel de cadastro.

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável | Para quê |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública (SEO, sitemap, Open Graph) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (só carrega após o aceite de cookies) |
| `LEAD_WEBHOOK_URL` | Recebe cada lead do formulário (CRM, Make, Zapier, RD Station) |
| `ADMIN_PASSWORD` | Ativa o painel em `/admin` |
| `ADMIN_SECRET` | Opcional: segredo da sessão do painel |
| `BLOB_READ_WRITE_TOKEN` | Criado ao conectar um **Blob store público** (Storage) ao projeto |

## Painel de cadastro (`/admin`)

1. Defina `ADMIN_PASSWORD` e conecte um Blob store público; publique de novo.
2. Acesse `/admin`, entre com a senha e cadastre as fazendas (fotos, coordenada do Google Maps, valor).
3. Ao salvar, o site é atualizado na hora. Sem nenhuma fazenda cadastrada, o site mostra exemplos
   (`lib/fazendas.ts`).

Os dados ficam em `realiza/fazendas.json` no Blob; as fotos são reduzidas no navegador antes do envio.

## Desenvolvimento

```bash
npm install
npm run dev
```
