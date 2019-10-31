package com.travelmaker.user.domain;

public enum Gender {
	MAIL(1), FEMAIL(2);

	private final int value;

	private Gender(int value) {
		this.value = value;
	}

	public int intValue() {
		return this.value;
	}

	public static Gender valueOf(int value) {
		switch (value) {
		case 1:
			return MAIL;
		case 2:
			return FEMAIL;
		default:
			throw new AssertionError("존재 하지 않는 값입니다. : " + value);
		}
	}
}
