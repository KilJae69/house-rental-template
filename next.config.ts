import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    trailingSlash: true,
    images: {
    
        remotePatterns: [
         
          {
            protocol: "https",
            hostname: "img.youtube.com",
          }
        ],
      },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);