import { register, login, refresh, logout, sendResetToken, resetPassword } from "../services/auth.js";

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

export const sendResetEmailController = async (req, res) => {
    await sendResetToken(req.body.email);
    res.json({
        status: 200,
        message: "Reset password email has been successfully sent.",
        data: {}
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
res.json({
    message: 'Password has been successfully reset.',
    status: 200,
    data: {},
});
};