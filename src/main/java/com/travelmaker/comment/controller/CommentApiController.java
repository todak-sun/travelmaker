package com.travelmaker.comment.controller;

import com.travelmaker.comment.domain.network.request.CommentApiRequest;
import com.travelmaker.comment.domain.network.response.CommentApiResponse;
import com.travelmaker.comment.ifs.CommentApiInterface;
import com.travelmaker.comment.service.CommentApiService;
import com.travelmaker.model.network.Header;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board/{bno}/comment")
public class CommentApiController implements CommentApiInterface<CommentApiRequest, CommentApiResponse> {

    @Autowired
    CommentApiService commentApiService;

    @GetMapping(path = "", produces = "application/json; charset=UTF-8")
    public Header<List<CommentApiResponse>> readAll(@PathVariable int bno) {
        return commentApiService.readAll(bno);
    }

    @PostMapping(path = "", produces = "application/json; charset=UTF-8")
    public Header<CommentApiResponse> create(@PathVariable int bno, @RequestBody Header<CommentApiRequest> request) {
        return commentApiService.create(bno, request);
    }

    @PostMapping(path = "/{cno}", produces = "application/json; charset=UTF-8")
    public Header<CommentApiResponse> create(@PathVariable int bno, @PathVariable int cno, @RequestBody Header<CommentApiRequest> request) {
        return commentApiService.create(bno, cno, request);
    }

    @PutMapping(path = "", produces = "application/json; charset=UTF-8")
    public Header<CommentApiResponse> update(@RequestBody Header<CommentApiRequest> request) {
        return commentApiService.update(request);
    }

    @DeleteMapping(path = "/{cno}", produces = "application/json; charset=UTF-8")
    public Header delete(@PathVariable int cno) {
        return commentApiService.delete(cno);
    }
}
