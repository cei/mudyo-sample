package message;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cei.spring.config.MessageConfiguration;
import cei.spring.config.PropertyConfiguration;
import cei.support.spring.message.MessageSupport;

@RunWith ( SpringJUnit4ClassRunner.class )
@ContextConfiguration ( classes = { PropertyConfiguration.class, MessageConfiguration.class } )
public class MessageTest {
	
	@Autowired
	MessageSupport message;
	
	@Test
	public void find() throws Exception {
		System.out.println("test.xml.xml".replace(".xml", "XXX"));
	}
	
	public void test() throws Exception {
		System.out.println();
		System.out.println();
		System.out.println(message.get("execute.confirm"));
		System.out.println();
		System.out.println();
		System.out.println();
	}
}
