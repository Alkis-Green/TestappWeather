function geoCoords() {
  //  Get user's location
  return new Promise((resolve, reject) => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve(coords);
        },
        (err) => {
          reject(err);
        }
      );
    } else {
      alert("Geo Location not supported");
    }
  });
}

export default geoCoords;
