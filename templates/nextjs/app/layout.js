import './styles.css';

export const metadata = {
	title: 'HarperDB Next.js Application',
};

export default function Layout({ children }) {
	return (
		<html>
			<body>
				<main>
					<h1>HarperDB Next.js Application</h1>
					{children}
				</main>
			</body>
		</html>
	)
}