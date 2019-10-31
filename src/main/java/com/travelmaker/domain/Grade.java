package com.travelmaker.domain;

public enum Grade {
	MASTER(4, null), OFFICIAL(2, MASTER), NORMAL(1, OFFICIAL);

	private final int value;
	private final Grade next;

	private Grade(int value, Grade next) {
		this.value = value;
		this.next = next;
	}

	public int intValue() {
		return this.value;
	}

	public Grade nextGrade() {
		return this.next;
	}

	public static Grade valueOf(int value) {
		switch (value) {
		case 1:
			return NORMAL;
		case 2:
			return OFFICIAL;
		case 4:
			return MASTER;
		default:
			throw new AssertionError("존재 하지 않는 값입니다. : " + value);
		}
	}
}
