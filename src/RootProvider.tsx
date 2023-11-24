import App from './App.tsx';
import Providers from './providers.tsx';

const RootProvider = () => {

    return(<Providers>
        <App/>
    </Providers>)
};

export default RootProvider;
