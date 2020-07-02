
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headersearch: {
    backgroundColor: "#FFF",
    alignContent: "center",
    height: 80,
  },
  inputsearch: {
    marginTop: 40,
    marginBottom: 30,
    marginRight: 10,
    backgroundColor: "#E5E6EE",
    borderRadius: 50,
  },
  title: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 20,
    fontSize: 15,
    fontFamily: "Airbnb Cereal App",
    fontWeight: "bold",
    color: "#4B4C72"
  },
  cardcontainer: {
    borderRadius: 10,
    width: 280,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  carditemcontainer1: {
    backgroundColor: `#5fdde5`,
    borderRadius: 10
  },
  carditemcontainer2: {
    backgroundColor: `pink`,
    borderRadius: 10
  },
   carditemcontainer3: {
    backgroundColor: `#a8df65`,
    borderRadius: 10
  },
   carditemcontainer4: {
    backgroundColor: `#f4e04d`,
    borderRadius: 10
  },
  cardtext: {
    fontFamily: "Airbnb Cereal App",
    fontSize: 25,
    color: "white",
    fontWeight: "bold"
  },
  imagecard: {
    resizeMode: "contain",
    flex: 1,
    height: 140,
    marginLeft: 0
  },
  footertabiconlist: {
    backgroundColor: "white"
  },
  titlestyle: {
    color: "#4B4C72",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Airbnb Cereal App",
    marginBottom: 10
  },
  cardlistdown: {
    flex: 1,
    width: 130,
    height: 'auto'
  },
  cardlistdowncontainer: {
    height: 195,
  },
  titlebook: {
    fontFamily: "Airbnb Cereal App",
    color: "#4B4C72",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default styles;