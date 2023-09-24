package com.ogjg.back.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChattingRoomUserInfoDto {

    private String email;
    private String userImg;
    private String userName;

    @Builder
    public ChattingRoomUserInfoDto(String email, String userImg, String userName) {
        this.email = email;
        this.userImg = userImg;
        this.userName = userName;
    }
}
