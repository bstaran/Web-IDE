package com.ogjg.back.chat.dto;

import com.ogjg.back.chat.domain.MessageType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class MessageDto {

    private MessageType type;
    private String email;
    private Long containerId;
    private String sender;
    private String content;

    @Builder
    public MessageDto(MessageType type, String email, Long containerId, String sender, String content) {
        this.type = type;
        this.email = email;
        this.containerId = containerId;
        this.sender = sender;
        this.content = content;
    }
}
