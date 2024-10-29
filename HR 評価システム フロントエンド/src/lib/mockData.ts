import { User, EvaluationTemplate, Department, Objective, Feedback } from '../types';

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: '営業部',
    manager: '山田 太郎',
    description: '新規顧客開拓と既存顧客管理を担当',
    employeeCount: 8
  },
  {
    id: '2',
    name: '開発部',
    manager: '佐藤 健一',
    description: 'プロダクト開発とシステム保守を担当',
    employeeCount: 10
  },
  {
    id: '3',
    name: '人事部',
    manager: '鈴木 花子',
    description: '採用・評価・研修の企画運営を担当',
    employeeCount: 4
  },
  {
    id: '4',
    name: 'マーケティング部',
    manager: '田中 美咲',
    description: 'マーケティング戦略の立案と実行を担当',
    employeeCount: 5
  },
  {
    id: '5',
    name: '経営企画部',
    manager: '中村 誠',
    description: '経営戦略の立案と予算管理を担当',
    employeeCount: 3
  }
];

export const mockEmployees: User[] = [
  // 営業部
  {
    id: '1',
    name: '山田 太郎',
    email: 'yamada@example.com',
    role: '管理者',
    department: '営業部',
    position: '部長'
  },
  {
    id: '2',
    name: '高橋 和也',
    email: 'takahashi@example.com',
    role: '評価者',
    department: '営業部',
    position: '課長'
  },
  {
    id: '3',
    name: '伊藤 健二',
    email: 'ito@example.com',
    role: '一般社員',
    department: '営業部',
    position: '主任'
  },
  {
    id: '4',
    name: '渡辺 真由',
    email: 'watanabe@example.com',
    role: '一般社員',
    department: '営業部',
    position: '営業担当'
  },
  {
    id: '5',
    name: '小林 達也',
    email: 'kobayashi@example.com',
    role: '一般社員',
    department: '営業部',
    position: '営業担当'
  },
  {
    id: '6',
    name: '加藤 美咲',
    email: 'kato@example.com',
    role: '一般社員',
    department: '営業部',
    position: '営業担当'
  },
  {
    id: '7',
    name: '吉田 隆',
    email: 'yoshida@example.com',
    role: '一般社員',
    department: '営業部',
    position: '営業担当'
  },
  {
    id: '8',
    name: '山本 恵子',
    email: 'yamamoto@example.com',
    role: '一般社員',
    department: '営業部',
    position: '営業担当'
  },

  // 開発部
  {
    id: '9',
    name: '佐藤 健一',
    email: 'sato@example.com',
    role: '評価者',
    department: '開発部',
    position: '部長'
  },
  {
    id: '10',
    name: '中村 優子',
    email: 'nakamura@example.com',
    role: '評価者',
    department: '開発部',
    position: '課長'
  },
  {
    id: '11',
    name: '木村 拓也',
    email: 'kimura@example.com',
    role: '一般社員',
    department: '開発部',
    position: 'シニアエンジニア'
  },
  {
    id: '12',
    name: '林 直子',
    email: 'hayashi@example.com',
    role: '一般社員',
    department: '開発部',
    position: 'エンジニア'
  },
  {
    id: '13',
    name: '清水 翔太',
    email: 'shimizu@example.com',
    role: '一般社員',
    department: '開発部',
    position: 'エンジニア'
  },
  {
    id: '14',
    name: '阿部 真紀',
    email: 'abe@example.com',
    role: '一般社員',
    department: '開発部',
    position: 'エンジニア'
  },
  {
    id: '15',
    name: '村上 健太',
    email: 'murakami@example.com',
    role: '一般社員',
    department: '開発部',
    position: 'エンジニア'
  },
  {
    id: '16',
    name: '近藤 美穂',
    email: 'kondo@example.com',
    role: '一般社員',
    department: '開発部',
    position: 'エンジニア'
  },
  {
    id: '17',
    name: '石井 大輔',
    email: 'ishii@example.com',
    role: '一般社員',
    department: '開発部',
    position: 'エンジニア'
  },
  {
    id: '18',
    name: '前田 裕子',
    email: 'maeda@example.com',
    role: '一般社員',
    department: '開発部',
    position: 'エンジニア'
  },

  // 人事部
  {
    id: '19',
    name: '鈴木 花子',
    email: 'suzuki@example.com',
    role: '評価者',
    department: '人事部',
    position: '部長'
  },
  {
    id: '20',
    name: '斎藤 健一',
    email: 'saito@example.com',
    role: '一般社員',
    department: '人事部',
    position: '採用担当'
  },
  {
    id: '21',
    name: '岡田 美咲',
    email: 'okada@example.com',
    role: '一般社員',
    department: '人事部',
    position: '研修担当'
  },
  {
    id: '22',
    name: '藤田 隆',
    email: 'fujita@example.com',
    role: '一般社員',
    department: '人事部',
    position: '労務担当'
  },

  // マーケティング部
  {
    id: '23',
    name: '田中 美咲',
    email: 'tanaka@example.com',
    role: '評価者',
    department: 'マーケティング部',
    position: '部長'
  },
  {
    id: '24',
    name: '山口 健太',
    email: 'yamaguchi@example.com',
    role: '一般社員',
    department: 'マーケティング部',
    position: 'マーケティングマネージャー'
  },
  {
    id: '25',
    name: '松本 さおり',
    email: 'matsumoto@example.com',
    role: '一般社員',
    department: 'マーケティング部',
    position: 'コンテンツマネージャー'
  },
  {
    id: '26',
    name: '井上 大輔',
    email: 'inoue@example.com',
    role: '一般社員',
    department: 'マーケティング部',
    position: 'デジタルマーケター'
  },
  {
    id: '27',
    name: '野田 恵子',
    email: 'noda@example.com',
    role: '一般社員',
    department: 'マーケティング部',
    position: 'マーケティングアナリスト'
  },

  // 経営企画部
  {
    id: '28',
    name: '中村 誠',
    email: 'nakamura.m@example.com',
    role: '評価者',
    department: '経営企画部',
    position: '部長'
  },
  {
    id: '29',
    name: '橋本 真理子',
    email: 'hashimoto@example.com',
    role: '一般社員',
    department: '経営企画部',
    position: '経営企画担当'
  },
  {
    id: '30',
    name: '池田 拓也',
    email: 'ikeda@example.com',
    role: '一般社員',
    department: '経営企画部',
    position: '予算管理担当'
  }
];

// 他のモックデータは変更なし
export const mockObjectives = [
  {
    id: '1',
    title: '四半期売上目標達成',
    description: '第2四半期の売上目標1億円の達成',
    progress: 75,
    status: '進行中',
    dueDate: '2024-06-30'
  },
  {
    id: '2',
    title: '新規顧客開拓',
    description: '新規顧客50社の獲得',
    progress: 100,
    status: '完了',
    dueDate: '2024-03-31'
  },
  {
    id: '3',
    title: '社員研修プログラムの実施',
    description: '全社員対象のリーダーシップ研修の実施',
    progress: 30,
    status: '進行中',
    dueDate: '2024-09-30'
  },
  {
    id: '4',
    title: '新システムの導入',
    description: '新ERPシステムの導入と運用開始',
    progress: 60,
    status: '進行中',
    dueDate: '2024-12-31'
  }
];

export const mockFeedback = [
  {
    id: '1',
    from: '山田 太郎',
    to: '鈴木 花子',
    type: 'ポジティブ',
    content: 'プロジェクトのリーダーシップが素晴らしかったです。チーム全体のモチベーション向上に貢献しました。',
    date: '2024-03-15'
  },
  {
    id: '2',
    from: '鈴木 花子',
    to: '佐藤 健一',
    type: '改善点',
    content: 'デッドラインの管理をより厳密にお願いします。進捗報告も定期的にお願いします。',
    date: '2024-03-14'
  },
  {
    id: '3',
    from: '田中 美咲',
    to: '山田 太郎',
    type: '目標',
    content: '次四半期は営業チームとの連携を強化し、マーケティング施策の効果測定を徹底したいと思います。',
    date: '2024-03-13'
  },
  {
    id: '4',
    from: '佐藤 健一',
    to: '田中 美咲',
    type: 'ポジティブ',
    content: 'マーケティング戦略の提案が的確で、製品の認知度向上に大きく貢献しました。',
    date: '2024-03-12'
  }
];

export const mockEvaluations = [
  {
    id: '1',
    title: '2024年度上期評価',
    type: '目標管理',
    criteria: [
      {
        id: '1',
        category: '業績',
        description: '売上目標の達成度',
        weight: 40
      },
      {
        id: '2',
        category: 'スキル',
        description: '専門知識とスキルの向上',
        weight: 30
      },
      {
        id: '3',
        category: 'チームワーク',
        description: 'チーム内でのコミュニケーションと協力',
        weight: 30
      }
    ]
  },
  {
    id: '2',
    title: '360度フィードバック評価',
    type: '360度評価',
    criteria: [
      {
        id: '4',
        category: 'リーダーシップ',
        description: 'チームの目標達成に向けたリーダーシップの発揮',
        weight: 35
      },
      {
        id: '5',
        category: 'コミュニケーション',
        description: '効果的なコミュニケーションスキル',
        weight: 35
      },
      {
        id: '6',
        category: '問題解決',
        description: '課題への対応と解決能力',
        weight: 30
      }
    ]
  }
];