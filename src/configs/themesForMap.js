export default {
	"base": {
		grades: [0, 5, 50, 100, 300],
		colors(n) {
			return n < 5   ? "#fee5d9" :
						 n < 50  ? "#fcae91" :
						 n < 100 ? "#fb6a4a" :
						 n < 300 ? "#de2d26" :
											 "#a50f15";
		}
	}
};
