package com.travelmaker.etcboard.dao;

import com.travelmaker.etcboard.domain.InquiryDTO;

import java.util.List;

public interface InquiryDAO {
    InquiryDTO readOne(int iqno);

    List<InquiryDTO> readAll();

    InquiryDTO create(InquiryDTO inquiryDTO);

    InquiryDTO update(InquiryDTO inquiryDTO);

    void delete(int iqno);
}
