package mock.hello;

import mock.MockTestConfiguration;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = MockTestConfiguration.class)
public class HelloTest {
	MockHttpServletRequest request = null;
	MockHttpServletResponse response = null;
	AnnotationMethodHandlerAdapter adapter = null;
	
	@Before
	public void setUp() {
		request = new MockHttpServletRequest();
		response = new MockHttpServletResponse();
	}
	
	@Test
	public void test() throws Exception {
		request.setRequestURI("/test");

		adapter.handle(request, response, new HelloController());
		
		assert 201 == response.getStatus();
	}
}
