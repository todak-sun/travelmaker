package com.travelmaker.essay.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EssaySearchFilter {
    private int seq;
    private int fixed;
    private String order;
}
