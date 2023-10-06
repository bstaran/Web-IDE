import {useEffect, useRef, useState} from "react";
import * as S from "./ChatBody.style";
import React from "react";
import {ChatMessage} from "../Chat.tsx";

interface ChatData {
    id: number;
    userImg: string;
    userName: string;
    text: string;
}

interface ChatBodyProps {
    messageList: ChatMessage[];
}

function ChatBody({messageList}: ChatBodyProps) {
    const userId = 1;
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messageList]);

    return (
        <S.ChatBody ref={chatBodyRef}>
            {messageList.map((chat: ChatMessage, index: number) => {
                return (
                    <React.Fragment key={index}>
                        {userId === 1 ? (
                            <S.MyChatBox>
                                <S.MyChatText>{chat.content}</S.MyChatText>
                                <S.MyChatInfoBox>
                                    <S.ChatUserName>{chat.sender}</S.ChatUserName>
                                </S.MyChatInfoBox>
                            </S.MyChatBox>
                        ) : (
                            <S.ChatBox>
                                <S.ChatInfoBox>
                                    <S.ChatUserName>{chat.sender}</S.ChatUserName>
                                </S.ChatInfoBox>
                                <S.ChatText>{chat.content}</S.ChatText>
                            </S.ChatBox>
                        )}
                    </React.Fragment>
                );
            })}
        </S.ChatBody>
    );
}

export default ChatBody;
