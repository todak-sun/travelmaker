package com.travelmaker.comment.controller;

import com.travelmaker.comment.domain.CommentSearchFilter;
import com.travelmaker.comment.domain.network.request.CommentApiRequest;
import com.travelmaker.comment.domain.network.response.CommentApiResponse;
import com.travelmaker.comment.ifs.CommentApiInterface;
import com.travelmaker.comment.service.CommentApiService;
import com.travelmaker.model.network.Header;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentApiController implements CommentApiInterface<CommentApiRequest, CommentApiResponse> {

    @Autowired
    CommentApiService commentApiService;

    @Override
    @GetMapping(path="/comment")
    public Header<List<CommentApiResponse>> readAll(@ModelAttribute CommentSearchFilter commentSearchFilter){
        return commentApiService.readAll(commentSearchFilter);
    }

    @Override
    @GetMapping(path = "/board/{bno}/comment", produces = "application/json; charset=UTF-8")
    public Header<List<CommentApiResponse>> readAll(@PathVariable int bno) {
        return commentApiService.readAll(bno);
    }

    @Override
    @PostMapping(path = "/board/{bno}/comment", produces = "application/json; charset=UTF-8")
    public Header<CommentApiResponse> create(@PathVariable int bno, @RequestBody Header<CommentApiRequest> request) {
        return commentApiService.create(bno, request);
    }

    @Override
    @PostMapping(path = "/board/{bno}/comment/{cno}", produces = "application/json; charset=UTF-8")
    public Header<CommentApiResponse> create(@PathVariable int bno, @PathVariable int cno, @RequestBody Header<CommentApiRequest> request) {
        return commentApiService.create(bno, cno, request);
    }

    @Override
    @PutMapping(path = "/board/{bno}/comment", produces = "application/json; charset=UTF-8")
    public Header<CommentApiResponse> update(@RequestBody Header<CommentApiRequest> request) {
        return commentApiService.update(request);
    }

    @Override
    @DeleteMapping(path = "/board/{bno}/comment/{cno}", produces = "application/json; charset=UTF-8")
    public Header delete(@PathVariable int cno) {
        return commentApiService.delete(cno);
    }
}
