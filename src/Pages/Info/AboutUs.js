import "./AboutUs.css";
import { Class } from "../../Constants/Css";
import { Text } from "../../Constants/Messages";

function AboutUs() {
	return (
		<div className={Class.ABOUT_US}>
			<h1>{Text.About_us}</h1>
			<section className={Class.MAIN_CONTAINER}>
				<section>
					<div className={Class.STORY}>
						<h2>Welcome to Netflix Wiki</h2>
						<p>
							Netflix Wiki is your go-to source for all things related to Netflix content available in different countries across the globe. We are a passionate team dedicated to
							providing you with up-to-date information on movies and TV shows, helping you explore the vast Netflix library.
						</p>
					</div>
				</section>
				<section>
					<div className={Class.STORY}>
						<h2>Our Mission</h2>
						<p>
							Our mission is to make it simple for you to discover and enjoy the diverse selection of content on Netflix, no matter where you are. Whether you're a cinephile or a
							binge-watcher, we're here to enhance your streaming experience.
						</p>
					</div>
				</section>
				<section>
					<div className={Class.STORY}>
						<h2>Get Involved</h2>
						<p>
							We encourage active participation from our community of Netflix enthusiasts. Feel free to share your thoughts, reviews, and recommendations. Your input helps us build
							a vibrant and engaging platform.
						</p>
					</div>
				</section>
			</section>
			<section className={`${Class.IMAGE}`}>
				<img
					src="https://assets.nflxext.com/ffe/siteui/vlv3/908077b4-cf0a-43c3-b2c9-435fb990299b/0575f84c-3b70-4342-a5a1-320d374612b0/NL-en-20220829-popsignuptwoweeks-perspective_alpha_website_small.jpg"
					alt="Banner"
				/>
			</section>
			<section className={Class.SUMMARY}>
				<h2>{Text.Background}</h2>
				<summary>
					Welcome to Netflix Wiki, the ultimate resource for everything you need to know about Netflix offerings in various countries around the world. Our website was developed as
					a school project with a passion for film and television as the driving force. We take pride in providing this online resource, where you can access a wealth of
					information about movies and series available on Netflix, depending on your location. Our mission is simple: we aim to make it easier for you to discover what's on
					Netflix, no matter where you are. Whether you're a movie buff, addicted to series, or just looking for something new to watch, Netflix Wiki has got you covered. What We
					Offer Comprehensive Country Information: We provide detailed and up-to-date information about the Netflix offerings in different countries. You can easily find out what
					movies and series are available in your region and other parts of the world. Reviews and Ratings: We offer in-depth reviews and ratings of popular films and series so
					that you can make an informed choice before you start streaming. News and Updates: Stay updated on the latest Netflix news, upcoming releases, and other noteworthy events
					in the entertainment world. User-Friendly Interface: Our website is designed with simplicity and user-friendliness in mind. You can effortlessly browse through the
					different country pages and find the information you're looking for. Get Involved! Netflix Wiki is more than just an informative website; it's a community of Netflix
					enthusiasts like you. We welcome active participation and contributions from our visitors. Have something to add, a favorite film to share, or want to voice your opinion
					on a recent release? Don't hesitate to make your voice heard! Thank you for visiting Netflix Wiki. We hope you'll find our website useful in exploring the wonderful world
					of movies and series on Netflix, no matter where you are. Together, we make this journey through the streaming world more enjoyable and informative. If you have
					questions, suggestions, or feedback, please feel free to reach out to us. We value your engagement and would love to hear from you. Enjoy your streaming! Feel free to
					customize and expand this text based on your own vision and values for the Netflix Wiki website. Good luck with your school project!
				</summary>
			</section>
		</div>
	);
}

export default AboutUs;
