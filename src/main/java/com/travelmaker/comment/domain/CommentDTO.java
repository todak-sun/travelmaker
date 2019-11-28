package com.travelmaker.comment.domain;

import com.travelmaker.user.domain.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Accessors(chain = true)
public class CommentDTO {
	private int cno;
	private int bno;
	private String content;
	private int likes;
	private int unlikes;
	private int seq;
	private String dateWrite;
	private int pcno;

	private UserDTO userDTO;
}
