package com.travelmaker.etcboard.service;

import com.travelmaker.etcboard.dao.InquiryDAO;
import com.travelmaker.etcboard.domain.InquiryDTO;
import com.travelmaker.etcboard.domain.request.InquiryApiRequest;
import com.travelmaker.etcboard.domain.response.InquiryApiResponse;
import com.travelmaker.etcboard.ifs.InquiryApiInterface;
import com.travelmaker.model.network.Header;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InquiryApiService implements InquiryApiInterface<InquiryApiRequest, InquiryApiResponse> {

    @Autowired
    InquiryDAO inquiryDAO;

    @Override
    public Header<InquiryApiResponse> readOne(int iqno) {
        return Optional.ofNullable(inquiryDAO.readOne(iqno))
                .map(this::response)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<List<InquiryApiResponse>> readAll() {
        return Optional.ofNullable(inquiryDAO.readAll())
                .map(this::response)
                .orElse(null);
    }

    @Override
    public Header<InquiryApiResponse> create(Header<InquiryApiRequest> request) {
        InquiryApiRequest data = request.getData();
        InquiryDTO inquiryDTO = InquiryDTO.builder()
                .content(data.getContent())
                .title(data.getTitle())
                .seq(data.getSeq())
                .isPrivate(data.getIsPrivate())
                .build();
        InquiryDTO newInquiryDTO = inquiryDAO.create(inquiryDTO);
        return response(newInquiryDTO);
    }

    @Override
    public Header<InquiryApiResponse> update(Header<InquiryApiRequest> request) {
        InquiryApiRequest data = request.getData();
        return Optional.ofNullable(inquiryDAO.readOne(data.getIqno()))
                .map((inquiryDTO) -> {
                    inquiryDTO.setContent(data.getContent())
                            .setTitle(data.getTitle())
                            .setIsPrivate(data.getIsPrivate());
                    return inquiryDAO.update(inquiryDTO);
                })
                .map(this::response)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(int iqno) {
        return Optional.ofNullable(inquiryDAO.readOne(iqno))
                .map(inquiryDTO -> {
                    inquiryDAO.delete(iqno);
                    return Header.OK("삭제 성공");
                })
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    private Header<InquiryApiResponse> response(InquiryDTO inquiryDTO) {
        InquiryApiResponse inquiryApiResponse = InquiryApiResponse.builder()
                .bno(inquiryDTO.getBno())
                .iqno(inquiryDTO.getIqno())
                .title(inquiryDTO.getTitle())
                .content(inquiryDTO.getContent())
                .dateWrite(inquiryDTO.getDateWrite())
                .isPrivate(inquiryDTO.getIsPrivate())
                .seq(inquiryDTO.getSeq())
                .build();
        return Header.OK(inquiryApiResponse, "데이터 조회 성공");
    }

    private Header<List<InquiryApiResponse>> response(List<InquiryDTO> inquiryDTOList) {
        List<InquiryApiResponse> inquiryApiResponses = new ArrayList<>();
        inquiryDTOList.forEach((inquiryDTO)-> {
            InquiryApiResponse inquiryApiResponse = InquiryApiResponse.builder()
                    .bno(inquiryDTO.getBno())
                    .iqno(inquiryDTO.getIqno())
                    .title(inquiryDTO.getTitle())
                    .content(inquiryDTO.getContent())
                    .dateWrite(inquiryDTO.getDateWrite())
                    .isPrivate(inquiryDTO.getIsPrivate())
                    .seq(inquiryDTO.getSeq())
                    .build();
            inquiryApiResponses.add(inquiryApiResponse);
        });
        return Header.OK(inquiryApiResponses, "데이터 조회 성공");
    }
}
