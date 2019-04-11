package server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({ "/projekteSchueler"})
    public String index() {
        return "forward:/index.html";
    }
}