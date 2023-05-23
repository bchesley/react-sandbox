import {shallow} from 'enzyme';
describe("testRender", () =>{
    it("should render hello world", () => {


        const html = idx.sayHello();


        const wrapper = shallow(html).toJSON();


        expect(wrapper.text()).toContain("Hello World!");


    });

});
