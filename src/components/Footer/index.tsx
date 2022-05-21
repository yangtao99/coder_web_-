import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const defaultMessage = '第四组出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: '金林涛      欧阳嘉豪',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: '💰',
          href: 'https://github.com',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '章子彬      李茗阳',
          href: 'https://github.com',
          blankTarget: true,
        },

      ]}
    />
  );
};

export default Footer;
