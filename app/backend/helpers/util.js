import * as jose from 'jose'

// export const verifyToken =async (token) => {
//   return jwt.verify(token, process.env.JWT_SECRET);
// };
const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
)

export const createToken = async (payload) => {
const alg = 'HS256'
const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
    return jwt;
}
export const verifyToken =async (token) => {
 const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
return payload;
};
