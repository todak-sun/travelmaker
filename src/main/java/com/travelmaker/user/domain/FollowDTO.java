package com.travelmaker.user.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowDTO {
	private String follower;
	private String followee;
}
