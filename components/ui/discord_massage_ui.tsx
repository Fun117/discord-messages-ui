import React from 'react';
import PropTypes from 'prop-types';
import '../../public/assets/css/discord_massage_ui.css';

const DiscordMsg = ({ lang, type, mode, mention, event, content, cmdName, userName, iconUrl, children }) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + currentDate.getDate()).slice(-2);

    if (type === 'button') {
        const DiscordMsgClass = `discord-button ${mode === 'primary' ? 'discord-button-primary' :
            mode === 'secondary' ? 'discord-button-secondary' :
                mode === 'success' ? 'discord-button-success' :
                    mode === 'danger' ? 'discord-button-danger' :
                        mode === 'link' ? 'discord-button-link' : 'primary'} ${event === 'false' ? 'discord-button-disabled' : ''}`;
        const disabledHtml = `${event === 'false' ? 'false' : 'true'}`;

        if (disabledHtml) {
            return (
                <>
                    {mode === 'link' && (
                        <a className={DiscordMsgClass} href={content} target="_blank" rel="noopener noreferrer">
                            {children}
                            <span className="outbound-link-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width={15} height={15}>
                                    <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z" />
                                    <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9" />
                                </svg>
                            </span>
                        </a>
                    )}
                    {mode !== 'link' && (
                        <button className={DiscordMsgClass}>
                            {children}
                        </button>
                    )}
                </>
            );
        } else {
            return (
                <>
                    {mode !== 'link' && (
                        <button className={DiscordMsgClass}>
                            {children}
                        </button>
                    )}
                </>
            );
        }
    } else {
        if (type === 'content') {
            if (mode) {
                const DiscordMsgClass = `${mode === 'group' ? 'discord-message-content' : `${mode === 'logo' ? 'discord-author-avatar' : `${mode === 'body' ? 'discord-message-body' : `${mode === 'buttons' ? 'discord-buttons' : ``}`}`}`}`;
                let msg_content_txt = '';

                if (mode === 'msg') {
                    if (children) {
                        const msgContent = children.toString();
                        const regex = /@(\w+)/g;
                        let currentIndex = 0;
                        let match;
                        let highlightedText = [];

                        while ((match = regex.exec(msgContent)) !== null) {
                            const username = match[1];
                            const spanElement = <span key={currentIndex} className='discord-mention'>@{username}</span>;
                            highlightedText.push(msgContent.substring(currentIndex, match.index));
                            highlightedText.push(spanElement);
                            currentIndex = match.index + match[0].length;
                        }

                        highlightedText.push(msgContent.substring(currentIndex));

                        const generateUniqueKey = () => {
                            return Date.now().toString();
                        };

                        const uniqueKey = generateUniqueKey();

                        msg_content_txt = (
                            <React.Fragment key={uniqueKey}>
                                {highlightedText.map((element, index) => (
                                    React.isValidElement(element) ? React.cloneElement(element, { key: index }) : <span key={index}>{element}</span>
                                ))}
                            </React.Fragment>
                        );
                    }
                }

                return (
                    <div className={DiscordMsgClass}>
                        {msg_content_txt}
                    </div>
                );
            } else {
                return null;
            }
        } else {
            const DiscordMsgClass = `${type === 'interaction' ? 'discord-interaction' : `${type === 'messages' ? 'discord-messages' : 'discord-message'}${mention ? ' discord-mention-highlight' : ''}`}`;

            return (
                <div className={DiscordMsgClass}>
                    {type === 'interaction' && (
                        <>
                            <img src={iconUrl} className="discord-interaction-author-avatar" alt="icon" />
                            <span className="discord-author-info discord-interaction-author-info">
                                <span className="discord-author-username">{userName} </span>
                            </span>
                            <span className="discord-interaction-command">
                                used <span className="discord-interaction-command-name"> /{cmdName}</span>
                            </span>
                        </>
                    )}
                    {type === 'contentLogo' && (
                        <>
                            <img src={iconUrl} alt="logo" />
                        </>
                    )}
                    {children}
                </div>
            );
        }
    }
};

DiscordMsg.propTypes = {
    lang: PropTypes.string,
    type: PropTypes.oneOf(['messages', 'message', 'interaction', 'content', 'button']).isRequired,
    mention: PropTypes.bool,
    event: PropTypes.string,
    content: PropTypes.string,
    cmdName: PropTypes.string,
    userName: PropTypes.string,
    iconUrl: PropTypes.string,
    mode: PropTypes.string,
    children: PropTypes.node,
};

export default DiscordMsg;