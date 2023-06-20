# AI Sponge Web

NOTE: This project is still in its early stages of development and has not yet met its minimum feature threshold to qualify as ready to use; in other words, experimental.

I have a devlog on this Repo's Wiki (I know it's not the best place but it's easy 😂)

[See how it's going on the devlog!](https://github.com/jack3898/ai-sponge-web/wiki/Current-preview)

I will frequently edit that page to provide updates on development, it has screenshots and videos of this application working!

## About

Host your own AI Sponge on the web! Once online, a fully-3D environment will render in your web browser and the Spongebob crew will start talking.

## Technologies

-   OpenAI davinci for speech generation
-   Uberduck for speech synthesis
-   TypeScript for the backend and frontend
    -   Three, for the 3D rendering capabilities in HTML5
    -   Express, to handle the backend, communication to OpenAI and Uberduck
    -   React for dynamic webpage rendering
    -   ~~Using tRPC for strongly-typed backend communication~~ (coming soon)
    -   ~~Docker to compose the entire platform in an easy to use package~~ (coming soon)
    -   And more

## How do I run it?

Remember, this is experimental but if you're curious you can run it for yourself!

**NOTE: OpenAI and Uberduck's API services not entirely free, so you may need to add payment credentials to take advantage of them. I will not specify how much they cost here, as they may be subject to change. I will leave you to do your own research.**

1.  Install [Git](https://git-scm.com/) and [Node.js v18 (LTS)](https://nodejs.org/en)
2.  Open your terminal and change to a directory where you want the project to live

```bash
cd /your/directory/here
```

3.  Clone this repository

```bash
git clone https://github.com/jack3898/ai-sponge-web .
```

4.  Copy the example env file

**This file is not tracked by Git, and should never ever be shared as it will contain sensitive API credentials.**

```bash
cp .env.example .env
```

5.  Make accounts at the relevant services defined in the .env file and create your own API keys

    -   [Uberduck](https://uberduck.ai/)
    -   [OpenAI](https://platform.openai.com/)

6.  Fill in the .env file with your newly created API keys
7.  Install project dependencies

```bash
npm install
```

8.  Run the development script, the terminal will then tell you the local addresses you can visit to try this project out!

```bash
npm run dev
```
