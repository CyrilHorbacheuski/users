import ReactDOM from 'react-dom/client';
import Main from './Main';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<ApolloProvider client={client}>
		<Main />
	</ApolloProvider>
);
