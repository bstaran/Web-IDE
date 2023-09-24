package com.ogjg.back.chat.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@Getter
public class UserRoom {

    @EmbeddedId
    private UserRoomPK id;

    public UserRoom(UserRoomPK id) {
        this.id = id;
    }

    @Embeddable
    @NoArgsConstructor(access = PROTECTED)
    @EqualsAndHashCode
    @Getter
    public static class UserRoomPK implements Serializable {
        private String email;
        private Long roomId;

        public UserRoomPK(String email, Long roomId) {
            this.email = email;
            this.roomId = roomId;
        }
    }
}
