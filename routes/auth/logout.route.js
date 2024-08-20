export function logoutUserRoute(req, res) {
    res.cookie("jwt", "", { maxAge: "1" });
    res.send('User logged out.');
}