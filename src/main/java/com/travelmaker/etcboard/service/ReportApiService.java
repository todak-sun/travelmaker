package com.travelmaker.etcboard.service;

import com.travelmaker.etcboard.dao.ReportDAO;
import com.travelmaker.etcboard.domain.ReportDTO;
import com.travelmaker.etcboard.domain.request.ReportApiRequest;
import com.travelmaker.etcboard.domain.response.ReportApiResponse;
import com.travelmaker.etcboard.ifs.ReportApiInterface;
import com.travelmaker.model.network.Header;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReportApiService implements ReportApiInterface<ReportApiRequest, ReportApiResponse> {

    @Autowired
    ReportDAO reportDAO;

    @Override
    public Header<List<ReportApiResponse>> readAll() {
        return Optional.ofNullable(reportDAO.readAll())
                .map(this::response)
                .orElse(null);
    }

    @Override
    public Header<ReportApiResponse> readOne(int reno) {
        return  Optional.ofNullable(reportDAO.readOne(reno))
                .map(this::response)
                .orElseGet(()-> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header<ReportApiResponse> create(Header<ReportApiRequest> request) {
        ReportApiRequest data = request.getData();

        ReportDTO reportDTO = ReportDTO.builder()
                .seq(data.getSeq())
                .category(data.getCategory())
                .content(data.getContent())
                .build();
        ReportDTO newReportDTO = reportDAO.create(reportDTO);
        return response(newReportDTO);
    }

    @Override
    public Header<ReportApiResponse> update(Header<ReportApiRequest> request) {
        ReportApiRequest data = request.getData();
        return Optional.ofNullable(reportDAO.readOne(data.getReno()))
                .map((reportDTO) ->{
                    reportDTO.setCategory(data.getCategory())
                            .setContent(data.getContent())
                            .setIsSolved(data.getIsSolved());
                    return reportDAO.update(reportDTO);
                })
                .map(this::response)
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    @Override
    public Header delete(int reno) {
        return Optional.ofNullable(reportDAO.readOne(reno))
                .map((reportDTO)->{
                    reportDAO.delete(reno);
                    return Header.OK("데이터 삭제 성공");
                })
                .orElseGet(() -> Header.ERROR("데이터 없음"));
    }

    private Header<ReportApiResponse> response(ReportDTO reportDTO){
        System.out.println(reportDTO.getCategory().getValue());
        System.out.println(reportDTO.getCategory());
        ReportApiResponse reportApiResponse = ReportApiResponse.builder()
                .bno(reportDTO.getBno())
                .reno(reportDTO.getReno())
                .seq(reportDTO.getSeq())
                .category(reportDTO.getCategory().getDescription())
                .content(reportDTO.getContent())
                .isSolved(reportDTO.getIsSolved())
                .dateWrite(reportDTO.getDateWrite())
                .pbno(reportDTO.getPbno())
                .build();
        return Header.OK(reportApiResponse, "데이터 조회 성공");
    }

    private Header<List<ReportApiResponse>> response(List<ReportDTO> reportDTOList){
        List<ReportApiResponse> reportApiResponseList = new ArrayList<>();
        reportDTOList.forEach((reportDTO) -> {
            ReportApiResponse reportApiResponse = ReportApiResponse.builder()
                    .bno(reportDTO.getBno())
                    .reno(reportDTO.getReno())
                    .seq(reportDTO.getSeq())
                    .category(reportDTO.getCategory().getDescription())
                    .content(reportDTO.getContent())
                    .isSolved(reportDTO.getIsSolved())
                    .dateWrite(reportDTO.getDateWrite())
                    .pbno(reportDTO.getPbno())
                    .build();
            reportApiResponseList.add(reportApiResponse);
        });
        return Header.OK(reportApiResponseList, "데이터 조회 성공");
    }

}
