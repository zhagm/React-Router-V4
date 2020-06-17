const allLinks = [
  { text: "Home", path: "/", icon: "home" },
  // { text: "My Account", path: "/account", icon: "profile", private: true },
  { text: "Rooms", path: "/rooms", icon: "rooms", private: true },
];

/**
 * Filters nav links based on whether user is authenticated and link is protected.
 * @function getNavLinks
 * @param {bool} isAuthenticated - whether user is authenticated or not.
 * @param {array} links - array of link objects (text, path, icon, ?private).
 * @returns {[filtered links]}
 */
const getNavLinks = (isAuthenticated, links = allLinks) => {
  return links.filter((link) => {
    if (link.private === undefined) return true;
    else if (link.private === true && isAuthenticated) return true;
    else if (link.private === false && isAuthenticated === false) return true;
    else return false;
  });
};

module.exports = { getNavLinks };
