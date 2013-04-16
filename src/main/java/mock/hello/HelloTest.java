package mock.hello;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = HelloConfiguration.class)
public class HelloTest {
	MockHttpServletRequest request = null;
	MockHttpServletResponse response = null;
	AnnotationMethodHandlerAdapter adapter = null;
	
	@Before
	public void setUp() {
		request = new MockHttpServletRequest();
		response = new MockHttpServletResponse();
		adapter = new AnnotationMethodHandlerAdapter();
	}
	
	@Test
	public void test() throws Exception {
		request.setRequestURI("/test");
		request.setMethod("GET");

		adapter.handle(request, response, new HelloController());
		
		assert 200 == response.getStatus();
	}
}
