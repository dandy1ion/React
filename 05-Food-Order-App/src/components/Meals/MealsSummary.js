import styles from "./MealsSummary.module.css";

const MealsSummary = () => {
	return (
		<section className={styles.summary}>
			<h2>Delicious Food, Delivered To You</h2>
			<p>
				Choose your favorite meal from our broad selection of available meals and enjoy a
				delicious lunch or dinner at home.
			</p>
			<p>
				All our meals are cooked by experienced chefs with high-quality ingredients, for
				you to enjoy!
			</p>
		</section>
	);
};

export default MealsSummary;
