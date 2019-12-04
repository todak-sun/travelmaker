package com.travelmaker.user.service;

import java.util.Random;

public class PwdGenerate {
    public static int pwdLength = 3;

    public static final char[] passwordTable1 = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'};
    public static final char[] passwordTable2 = {
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
    };

    public static final char[] passwordTable3 = {
            '!', '@', '#', '$', '%', '^', '&', '*',
            '(', ')'
    };

    public static String excuteGenerate() {
        Random random = new Random(System.currentTimeMillis());
        int tablelength1 = passwordTable1.length;
        int tablelength2 = passwordTable2.length;
        int tablelength3 = passwordTable3.length;

        StringBuffer buf = new StringBuffer();

        for (int i = 0; i < pwdLength; i++) {
            buf.append(passwordTable1[random.nextInt(tablelength1)]);
            buf.append(passwordTable2[random.nextInt(tablelength2)]);
            buf.append(passwordTable3[random.nextInt(tablelength3)]);
        }

        return buf.toString();
    }

    public int getPwdLength() {
        return pwdLength;
    }

    public void setPwdLength(int pwdLength) {
        this.pwdLength = pwdLength;
    }
}
