# Pomodoro

App web pra gerenciar tempo com a técnica Pomodoro. React 19 + TypeScript + Vite.

## Tecnologias

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (modo strict)
- [Vite 8](https://vite.dev/) com HMR
- [React Compiler](https://react.dev/learn/react-compiler) — memoização automática, então nada de `useMemo`/`useCallback` manuais
- [oxlint](https://oxc.rs/) como linter
- CSS Modules + tokens de design em CSS custom properties

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- npm (já vem com o Node)

## Instalação

```bash
npm install
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento (Vite HMR) |
| `npm run build` | Checa os tipos (`tsc -b`) e gera o build de produção |
| `npm run lint` | Roda o oxlint |
| `npm run preview` | Serve localmente o build gerado |

Test runner ainda não foi configurado.

## Estrutura do projeto

src/
├── main.tsx # Ponto de entrada
├── App.tsx # Componente raiz
├── index.css # Estilos globais
├── assets/ # Imagens e outros arquivos estáticos
└── components/ # Componentes da aplicação (nomeados, sem export default)

### Estilos

Duas camadas: globais, com os tokens de design (`--accent`, `--text`, `--bg`, `--border` etc.) e os estilos base dos elementos HTML; e por componente, onde cada um tem seu `*.module.css` do lado do `.tsx`.

## Licença

Ainda não definida.