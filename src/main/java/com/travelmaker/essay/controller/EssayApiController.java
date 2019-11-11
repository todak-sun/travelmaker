package com.travelmaker.essay.controller;

import com.travelmaker.essay.domain.EssaySearchFilter;
import com.travelmaker.essay.ifs.EssayApiInterface;
import com.travelmaker.essay.service.EssayApiService;
import com.travelmaker.model.network.Header;
import com.travelmaker.essay.domain.network.request.EssayApiRequest;
import com.travelmaker.essay.domain.network.response.EssayApiResponse;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/essay")
@Log
public class EssayApiController implements EssayApiInterface<EssayApiRequest, EssayApiResponse> {

    @Autowired
    EssayApiService essayApiService;

    @Override
//    @GetMapping(path = "", produces = "application/json; charset=UTF-8")
    public Header<List<EssayApiResponse>> readAll() {
        return essayApiService.readAll();
    }

    @Override
    @GetMapping(path = "", produces = "application/json; charset=UTF-8")
    public Header<List<EssayApiResponse>> readAll(@ModelAttribute EssaySearchFilter essaySearchFilter) {
        return essayApiService.readAll(essaySearchFilter);
    }

    @Override
    @GetMapping(path = "/{rno}", produces = "application/json; charset=UTF-8")
    public Header<EssayApiResponse> readOne(@PathVariable int rno) {
        return essayApiService.readOne(rno);
    }

    @Override
    @PostMapping(path = "", produces = "application/json; charset=UTF-8")
    public Header<EssayApiResponse> create(@RequestBody Header<EssayApiRequest> request) {
        return essayApiService.create(request);
    }

    @Override
    @PostMapping(path = "/{rno}/image")
    public String upload(@PathVariable int rno, @ModelAttribute EssayApiRequest request) {
        return essayApiService.upload(rno, request);
    }

    @Override
    @PutMapping(path = "", produces = "application/json; charset=UTF-8")
    public Header<EssayApiResponse> update(@RequestBody Header<EssayApiRequest> request) {
        return essayApiService.update(request);
    }

    @Override
    @DeleteMapping(path = "/{rno}", produces = "application/json; charset=UTF-8")
    public Header delete(@PathVariable int rno) {
        return essayApiService.delete(rno);
    }
}
