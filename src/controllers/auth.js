import { register, login, refresh, logout } from "../services/auth.js";

const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });
};

export const registerController = async (req, res) => {
    const newUser = await register(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: newUser,
    });
};

export const loginController = async (req, res) => {
    const session = await login(req.body);

    setupSession(res, session);
    res.json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const refreshController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const session = await refresh({ refreshToken, sessionId });

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const logoutController = async (req, res) => {
    const { sessionId } = req.cookies;
    if (sessionId) {
        await logout(sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");
    res.status(204).send();
};

