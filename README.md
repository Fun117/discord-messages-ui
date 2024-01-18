# DiscordMsg Component

[![MIT License][license-image]][license-url]

The DiscordMsg component is a React component designed to represent Discord-style messages and interactions. This versatile and extensible component allows easy integration of messages, buttons, and interactive elements, enabling developers to create Discord-like user interfaces seamlessly.

## language

- [English](./README/en.md)
- [日本語](./README/ja.md)

# table of contents

-  [DiscordMsg Component](#discordmsg-component)
-  [table of contents](#table-of-contents)
-  [Installation](#installation)
    -  [npm](#npm)
    -  [yarn](#yarn)
    -  [Components are not generated?](#components-are-not-generated)
-  [change log](#change-log)
-  [Usage](#usage)
    -  [construct the ui](#construct-the-ui)
    -  [sample code](#sample-code)
-  [Tutorial Create ui](#tutorial-create-ui)
    -  [step1](#messages)
    -  [step2](#message)
    -  [step3](#interaction)
    -  [step4](#content)
    -  [step5](#button)
    -  [step6](#usage-example)
-  [advantages](#advantages)
-  [Contributors](#contributors)

# Installation

## npm

```bash
npm I discord-messages-ui
```

## yarn

```bash
yarn add discord-messages-ui
```

## Components are not generated?

It can be generated by executing the following command in the project's root directory.

```bash
node ./node_modules/discord-msg-ui-beta/install-package.js
```

<hr/>

# change log

-  0.1.0
    - Added modules for message display
-  0.1.1
    - Added Japanese version to README
    - Fixed repository URL
-  0.1.2
    - Added code to inquire about the installation directory
    - Added description
-  0.1.3 ~ 0.1.8
<hr/>

# Usage

## construct the ui

<img src="./public/assets/img/discordMsg_bot_openAi_1.png" />
<img src="./public/assets/img/discordMsg_bot_npm_1.png" />

## sample code
```tsx
<DiscordMsg type="messages">
    <DiscordMsg type="message" mention={true}>
        <DiscordMsg type="interaction" cmdName={`command`} userName={`Fun117`} iconUrl={`/assets/img/@Fun117_icon.png`}/>
        <DiscordMsg type="content" mode="group">
            <DiscordMsg type="content" mode="logo" iconUrl={`https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png`}/>
            <DiscordMsg type="content" mode="body">
                <DiscordMsg type="content" mode="bot" userName="npm"/>
                <DiscordMsg type="content" mode="msg">
                    @user description
                </DiscordMsg>
                <DiscordMsg type="content" mode="buttons">
                    <DiscordMsg type="button" mode="primary" event="false">Click me?</DiscordMsg>
                    <DiscordMsg type="button" mode="primary">primary</DiscordMsg>
                    <DiscordMsg type="button" mode="secondary">secondary</DiscordMsg>
                    <DiscordMsg type="button" mode="success">success</DiscordMsg>
                    <DiscordMsg type="button" mode="danger">danger</DiscordMsg>
                    <DiscordMsg type="button" mode="link" content={`https://google.com`}>Link</DiscordMsg>
                </DiscordMsg>
            </DiscordMsg>
        </DiscordMsg>
    </DiscordMsg>
</DiscordMsg>
```

# Tutorial Create UI

Welcome to the tutorial on creating Discord-style UI using the `DiscordMsg` component. This tutorial will guide you through the steps to construct a simple and dynamic Discord-like interface for your React-based projects.

## Messages
- Use this to group multiple message components.
```tsx
<DiscordMsg type="messages">
    {/* Include individual message components here */}
</DiscordMsg>
```

## Message
- Use this to represent a single message.
- Add the `mention` prop if the message should mention someone.
```tsx
<DiscordMsg type="message" mention={true}>
    {/* Include content, interactions, or buttons here */}
</DiscordMsg>
```

## Interaction
- Use this to show an interaction, such as a command usage.
- Include `cmdName` `userName` and `iconUrl` props.
```tsx
<DiscordMsg type="interaction" cmdName={`command`} userName={`Fun117`} iconUrl={`/assets/img/@Fun117_icon.png`}/>
```

## Content
- Use this to display message content.
- Specify mode as `group` `logo` `body` or `buttons`.
- Use nested `DiscordMsg` components for structured content.
```tsx
<DiscordMsg type="content" mode="group">
    {/* Include nested content components here */}
</DiscordMsg>
```

## Button
- Use this for clickable buttons.
- Specify mode as `primary` `secondary` `success` `danger` or `link`.
- Add `event` prop to disable the button if needed.
```tsx
<DiscordMsg type="button" mode="primary" event="false">Click me?</DiscordMsg>
```

## Usage Example
- Assemble the components as needed for your Discord-style UI.
```tsx
<DiscordMsg type="messages">
    <DiscordMsg type="message" mention={true}>
        <DiscordMsg type="interaction" cmdName={`command`} userName={`Fun117`} iconUrl={`/assets/img/@Fun117_icon.png`}/>
        <DiscordMsg type="content" mode="group">
            <DiscordMsg type="content" mode="logo" iconUrl={`https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png`}/>
            {/* Add more content components as needed */}
        </DiscordMsg>
    </DiscordMsg>
</DiscordMsg>
```

Now you have a step-by-step guide on creating a Discord-style UI using the `DiscordMsg` component. Feel free to customize and expand upon these examples to suit your specific project requirements.

<hr/>

# advantages

- Highly visible UI
- Easy to customize
- Dynamically resizable
- Can be created with short code

# Contributors

-  [Fun117](https://github.com/fun117)

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: ./LICENSE.txt