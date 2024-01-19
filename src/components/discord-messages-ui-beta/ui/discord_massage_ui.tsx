import React from 'react';
import PropTypes from 'prop-types';
import '../css/discord_message_ui.css'

export const DiscordMsg = ({ type, mode, mention, event, content, cmdName, userName, iconUrl, children }) => {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var currentDay = ('0' + currentDate.getDate()).slice(-2);
    if(type === 'button'){
        var DiscordMsgClass = `discord-button ${mode === 'primary' ? 'discord-button-primary' : 
        mode === 'secondary' ? 'discord-button-secondary' : 
        mode === 'success' ? 'discord-button-success' : 
        mode === 'danger' ? 'discord-button-danger' : 
        mode === 'link' ? 'discord-button-link' : 'primary'} ${event === 'false' ? 'discord-button-disabled' : ''}`;
        var disabledHtml = `${event === 'false' ? 'false' : 'true'}`;
        if(disabledHtml){
            return (
                <>
                    {mode === 'link' && (
                        <a className={DiscordMsgClass} href={content} target="_blank" rel="noopener noreferrer">
                            {children}
                            <span className="outbound-link-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" x="0px" y="0px" viewBox="0 0 100 100" width={15} height={15} >
                                    <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"/>
                                    <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"/>
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
        }else{
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
    }else{
    if(type === 'content'){
        if(mode){
            var DiscordMsgClass = `${mode === 'group' ? 'discord-message-content' : `${mode === 'logo' ? 'discord-author-avatar' : `${mode === 'body' ? 'discord-message-body' : `${mode === 'buttons' ? 'discord-buttons' : ``}`}`}`}`;
            let msg_content_txt: React.ReactNode | string = '';
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
                    };
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
                };
                return (
                    <div className={DiscordMsgClass}>
                        {msg_content_txt}
                    </div>
                );
            }else{
                return (
                    <div className={DiscordMsgClass}>
                        {mode === 'logo' && (
                            <>
                                <img src={iconUrl} alt="logo"/>
                            </>
                        )}
                        {mode === 'bot' && (
                            <>
                                <span className="discord-author-info">
                                    <span className="discord-author-username">{userName}</span>
                                    <span className="discord-author-bot-tag"> Bot </span>
                                </span>
                                <span className="discord-message-timestamp">{currentMonth}/{currentDay}/{currentYear}</span>
                            </>
                        )}
                        {children}
                    </div>
                );
            }
        }else{
            return null;
        };
    }else{
        var DiscordMsgClass = `${type === 'interaction' ? 'discord-interaction' : `${type === 'messages' ? 'discord-messages' : 'discord-message'}${mention ? ' discord-mention-highlight' : ''}`}`;
        return (
            <div className={DiscordMsgClass}>
                {type === 'interaction' && (
                    <>
                        <img src={iconUrl} className="discord-interaction-author-avatar" alt="icon"/>
                        <span className="discord-author-info discord-interaction-author-info">
                            <span className="discord-author-username">{userName} </span>
                        </span>
                        <span className="discord-interaction-command">
                            used <span className="discord-interaction-command-name"> /{cmdName}</span>
                        </span>
                    </>
                )}
                {children}
            </div>
        )
    };
    };
};
DiscordMsg.propTypes = {
    type: PropTypes.oneOf(['messages', 'message', 'interaction', 'content','button']).isRequired,
    mention: PropTypes.bool,
    event: PropTypes.string,
    content: PropTypes.string,
    cmdName: PropTypes.string,
    userName: PropTypes.string,
    iconUrl: PropTypes.string,
    mode: PropTypes.string,
    children: PropTypes.node,
};

export const DIscordMsgEmbed = ({ type, mode, children, className, content, color }) => {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var currentDay = ('0' + currentDate.getDate()).slice(-2);
    if(type === 'link'){
        return (
            <a href={content} target={mode ? mode : '_blank'}>{children}</a>
        )
    }else{if(type === 'div'){
        return (
            <div className={className}>{children}</div>
        )
    }else{if(type === 'timestamp'){
        if(mode === 'yy/MM/dd'){
            return (
                <>
                    {currentYear}/{currentMonth}/{currentDay}
                </>
            )
        }else{
            return (
                <>
                    {currentMonth}/{currentDay}/{currentYear}
                </>
            )
        };
    }else{if(type === 'embed'){
        return (
            <div className="discord-embed">
                <div className="discord-embed-left-border" style={{ backgroundColor: `${color}` }}/>
                <div className="discord-embed-container">
                    {children}
                </div>
            </div>
        );
    }else{if(type === 'contents'){
        if(mode){
            if(mode==='title' || mode==='description' || mode==='fields' || mode==='field' || mode==='field-title'){
                return (
                    <div className={`discord-embed-${mode}`}>
                        {children}
                    </div>
                )
            }else{if(mode === 'icon'){
                return (
                    <img src={content} className='discord-embed-image' alt='img'/>
                )
            }else{if(mode === 'thumbnail'){
                return (
                    <img src={content} className='discord-embed-thumbnail' alt='img'/>
                )
            }else{if(mode === 'author'){
                return (
                    <div className="discord-embed-author">
                        {children}
                    </div>
                )
            }else{if(mode === 'author-icon'){
                return (
                    <img src={content} className="discord-embed-author-icon" alt="img"/>
                )
            }else{if(mode === 'addFields'){
                return (
                    <div className="discord-embed-field discord-embed-field-inline">
                        {children}
                    </div>
                )
            }}}}}};
        }else{
            return (
                <div className="discord-embed-content">
                    {children}
                </div>
            );
        };
    }else{if(type === 'footer'){
        if(mode){
            if(mode === 'icon'){
                return (
                    <img src={content} className='discord-embed-footer-icon' alt='icon'/>
                )
            }else{
                if(mode === 'content'){
                    return (
                        <span>
                            {children}
                        </span>
                    )
                };
            };
        }else{
            return (
                <div className="discord-embed-footer">
                    {children}
                </div>
            )
        };
    };};};};};};
    console.log(`error`)
};
DIscordMsgEmbed.propTypes = {
    type: PropTypes.oneOf(['link','div','timestamp','embed','contents','footer']).isRequired,
    mode: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.string,
    content: PropTypes.string,
};
