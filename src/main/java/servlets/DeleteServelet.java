package servlets;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import controllers.UserController;
import helpers.Encryptor;
import models.Response;
import models.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/delete", name = "User delete Servlet")
public class EditUserServlet extends HttpServlet {

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        String json = req.getReader().lines().collect(Collectors.joining());
        User user = mapper.readValue(json, User.class);

        user.setPassword(Encryptor.getSHA256(user.getPassword(), user.getUsername().toLowerCase()));
        user.setId(Integer.parseInt(req.getSession(false).getAttribute("usuario_id").toString()));

        Response<User> response = UserController.deleteUser(user);

        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        res.setStatus(response.getStatus());
        res.getWriter().print(mapper.writeValueAsString(response));
    }
}
