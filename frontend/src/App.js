import './App.css';
import HeaderMBS from "./components/header";
import MainContent from "./components/mainContent";
import FooterMBS from "./components/footer";
import { Layout } from 'antd';

const {
  Header, Footer, Content,
} = Layout;

const App = () => (
    <div>
        <Layout>
            <Header><HeaderMBS /></Header>
            <Content><MainContent /></Content>
            <Footer><FooterMBS /></Footer>
        </Layout>
    </div>
)


export default App;
