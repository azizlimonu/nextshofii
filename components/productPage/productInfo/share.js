import styles from './share.module.scss';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const Share = () => {
  return (
    <div className={styles.share}>
      <FacebookShareButton url={window?.location.href}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={window?.location.href}>
        <FacebookMessengerIcon size={32} round={true} />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={window?.location.href}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton url={window?.location.href}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <EmailShareButton url={window?.location.href}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
}

export default Share;