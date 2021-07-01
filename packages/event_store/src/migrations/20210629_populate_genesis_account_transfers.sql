INSERT IGNORE INTO GenesisAccountTransfers(transferHash, deployHash, blockHash, transferId, fromAccount, toAccount, sourcePurse, targetPurse, amount, timestamp, isInternal, isIgnored, isReviewed)
SELECT transferHash, deployHash, blockHash, transferId, fromAccount, toAccount, sourcePurse, targetPurse, amount, timestamp, toAccount IN ('608b12ea61283eecd066a06644bafcbb65fa8057aa53d57db3c951d5c45bb6e2', '57ae818eadf5da683454d07254e76f13d412a15e410fbae7d1b6fa2263d86631', 'd9fcf0a5eb772023b32f2a862eee723887c99323b6613f779b00795d4c739538', '4d6f9b7f5aee58f84911b34eb5222e766c51147ff92a9b1105544bac4d3d8b04', '5288513b9df476a252fafd17d977c50cd9dadd83804d38f328b0d68d6ff1a033', '53d830344dfe58f4b6c98dc386e09b65031cd9ed6bfeb07e6dcd5eef2d636e0e', '02f1bafd41008d9b8f4d896a1ed3252b4b834313314d8a394f40d41b908181bc', '81104f809faaf0bbaef5d6edab15bebde04c334409fe248db746201f30f58df4', '1bd85ea9fb9632b3b7c4c5d9d84568f9859fb98e0a3fed4335b893e9cae24e6d', 'e717e53ca56139a6877e32c24055886dd1992a1057163f8d5dbcdac31aa0abc8', 'f4c035ea002e32dc11938405f5b1f1cf8792dc60a6588f738d8a1b18cb86b68e', 'e75017e71e67297923d7f1e1fa7f8de0fd45b60e1d9dccb963ffc30eb7bb5830', 'f88628f3be63d0c8db1d22857389a30ac445e0d75772cf3217feeb797ff8d6f4', 'ec1aaab16cb1f04efc08b2580326c4a350805c2bca5710f122ba341a56bee656', 'd9bb880df9221ebd9e9c8a74c75f06c92f0f56a320e306eee2939e061a619df8', '24b6d5aabb8f0ac17d272763a405e9ceca9166b75b745cf200695e172857c2dd', '847ed21b6581c604cb3cfc4d88f94fdd03c3f0cb3b74399da50261dafdf1a06b', 'f056858aefd247a039872e6595e295db0f8f30f516db2b9b99bdb711b937fe6d', 'b7e3617083ec93d15ca8d6a570bc9b9b8508b3a877c9cf94fb3d327a69f33b7a', '6c07fc04adb4029049536144c04b07d7be8a32650604c7c0f18fa8fd89a4d1a4', '4420e6b0024a7c44001b6b454243850ef31d1f07036006f417b14bcde12514e7', '4fecb907e6af44b1d982181e2eaf409b5a84c88393bf4c358357139b6be55785', '49ade8ee1c4a54c7c799846ac5ace380134c3996f2ff28b4617cb8ccc4fde058', '32493614943b095b04391171b442d4d52648cad56f66e296c7fb96bf224785c4', '26a0b90541a7d0bc521d7543bb295a67f2b1289f83e47138bd75e9d09dcd44c1', 'f368b795b05445420064b67076bbf60b3a6ad8731b0228488c0bdcbb3004aac9', '8524303234c6d876f232cab27ef14956580df2f6853141fc795901a94630d1b8', 'dbbab1ca42a5416c1547a3e17fc6346f995e86ad15c9edd26d9326d042f91d98', 'cefcd0d99ed2e9bb621578b785931816e75cf7cf3e2e030eebcf73191e908eca', '541fe25a61a426958c9ab867e5c57fab42bf1e9217b37999028cd0ba35a3bcaf', '84fe406504a1c85e6680e19d3b80ce6f0c312fb7f2ecfcd2d04c8df8818589c3', 'cc83f27747ef06bbbd5bdf1244f8f5601c5027f3d1963957d11a8c8eafadfaff', '9fb3803b335f14b083b97400e57d5c8e8ad0ec5859a51225b6611e34357c8d77', '577ee1033a134cf21f2aac5adeec11e8aa038417838f0c28bb9dced8856bd7ae', 'bcfdca815487763999ae0de93f0fe30991cbe52f9f5c0d46fa5fc2b8281b8331', '8a0aaa01f6d691aa33af7f86d0839f4a5090d0fc449a6da8abcc78700cf029fe', '46586af38f068769c6911fedfae82effb05635a3e33ccd50ec01be41b862bdaa', '7438ad169ceec12806d3343598cb21d29357b2278c005cc3f9e71480e378d758', '6ee862e976a99eed1c517bbf7f0d3e97f988f1cf12f3b8e347c033ac9ff745d2', '416c86c13f5dcc4aa0c553407e9bf15004ba4ebd296cf95e16b183df1f7dc5d7', 'ba8043ac5d8b06a9b7e52215ad5cc406bbdfb88459f9fb8229a48c55cdf95b46', '4e1e5c580cfda47e8f466be3719c3a5a529e62740030f56b9f433212929630ee', '85930bab3c3aa081a60b447c374ec0e81f847ea7612222e08a5c847ff2685f16', 'd5033499bb2e22a0b316a72b87169c11a08c06e87964e80d4e222d3dd8d133a8', 'aae51c8d533673728a18e141434a04b9d77dad9e00da337ae524a2606cd15461', '91733e84d9fcfa39fd5e7187ba067eb9f48fd41b8d053b23e635747444a8098d', '65ee0b0a2831fc5ea86a928f5d93d1a8b599032d36f303e6aadc0a1fe7cf91a2', '8b68483349bad3af9cc5bce15fc8cde02c4683df39d741969f3d4e1d49e0f06f', '501ddbb4cacd5b4a9ce3094aa34deab7a0c57b89d05185abf937f3afe07043d8', '3b126fd053336ed013fea41eec61f8d7480a6df86ad5840ec529eb7fdb203d27', '41a5d1bc379d235fa0e745b04eb32af590ec064279c8d44f50865e55f8347836', '9bdcf9bcdb8d155cde18f9216944a3eecdaadf46438e94059d4f3c41ab0516df', '058522f614e0dee1e954086eab1d04852f21f2a076043ef49aa537ece6d46a23', '9f59c3595bcb096bf9774b0d7d18dadf1a8fac507030b196414e9ae83c546bf8', '56d67580db086fd8f1547ed19e506a193ac7548693baa88a20fb570248759df1', '69edd622650021ce86a533767e3ddf66e5c39331b0cb1488352194792ff62ccd', '4a19db8df0a8336ec41e19e0a36e89edc40b7c8940b05c2f5e5e7015aa51ad78', '762a3cc23b3b46b42bce1b503ff6b45e9c8762ffb0292a09600c5adcb9bff578', 'b8e119b446f65536e4cc213fba4a0e38533007ae5dea52c4618a86647ccc873a', '02faaa3d8155039a88589d531f8107335476589c2e920980a6981f905671e20d', '8c15bba2d147859c7b7a8f43028eeb4d3c9571c6e36dfecc97c77463d3af08cd', 'b55b02323e4d9969d16c72e00cd93e8f3dfa852ca50bf3aa51a9c8399ca3047f', '4e542609e2ab3d38abb2f444fd260c18f9edac47d60c12f1fc6ac104c733ee2e', '4ec7508d7491dcfa75a99092dc7e26c7737931ed2bef0bec2a4822650d0d1836', '3786078ffb0eb0d14af6bd230c1e3bb06410951d62e6638b066999d9384fef2e', 'c44288ef2e0be8c310edbc74799bde953a1ed0326297545bec327db8f9ae6e14', '115a03652334591a36792dcf2fa583ab9f8decd190f0f9f503fbf38f0c948c36', 'b4025fe8e24f008ba2dd93d8faa3c42ebac14358dbc671e774cb787915dcaa06', '473bd11d572cf3741599f6a3593a49124439b4e5aeeea5865e4867f152bfed3a', 'e5a8f6acbe2247da874f8919240895981761d714d5aae0f82ba439005d609b6f', '7cdfcb2fd3ac6db74d271c79ac7b60fff0dfa609c5029a81fad7eae327793f99', '8aaa5049c0472762b77c4a2d8070e3a232c209a2a4a6d6a0f96d4275993bbe7b', 'a7e00310794fb4f210af059bda2e35e1468e3055a068371233db3e05867487ec', 'cbae6e7474ec4f3da95ea8091bb9a3738c8422dc48e93fc062166450516daaff', 'ecde001730c1af150d002262f2e0126cefade8d02ce713ee93b8cc01c6633d53', '24fb912e940d97bd7e7040a57ece41efb0a925fb71a7c55f0b64bc7d6dd1a45c', '8dd65e4c2c51f9c16a4089d2581c95203deb9c1620d7bdee2cc5e13cb0d74a93', 'c775657a3cccc3e9e93190292e5282602fd6f2a393366411df9d4ecb3b4111a3', '6a7b79827e0d753572a73da4cae9a93777299c0dce9ab5d2bf41c068bcb7dca8', '2e7eaac546debfd36b6f58342a1f1a0a7f03a4bec5c3b73aa33d478241423ea7', '617b3d821c7a3b38c6397b9cb155050b72e1e324b6e4d82702d622e8a1e04da1', '51319645a7de2e35ce5fa6c3a6884e75583d79499306166bd819e2415e64fd22', '20249530fc505e1e486de8e3ad82690569d23afae5748365523b526d524afda5', 'b9f8b0534497c074cf009e6e524f8bb078e8ff9e6608e7b5516fa48301eb253c', '91d5d28b69feba3fdbef4acd749bc4947ab0c235eba37053aa7b72c34afda7a4', '67110c7905664d95692a99e7219b7f0820cb6a8b2a0dee17a5cc51699a152e1f', '72896e02fc9d9d599ed7f62d65a70cc32bc0d3bff0340a9987f83ffbad99b707', '335a1df397da448223a66a1ae827fbd600cf459957db232b0b1b5c014868008c', 'd75bfb80102ea1e1835289b39bf7c5febe72a35fa1c3c3ab9042e10125882885', '7bca869ed387885e1e9c3ae60aae0b45c0ee58554af87ae6486b56cf661e8d82', '59861ff8b6e75ad8e3c6c253d7f44531ffa3d5c090bb0cdab633456599eb2662', '5dcabc5635685801551c7bf712e408e1367f908a99417d91586bb4daf169f653', '82ea11a5b25ad04ac79f727e20b1c957ba0fb1c28f423ebae3f7ad197d0367a8', '71d1c92656ea200c2d7ffc3c6ab952f0f6e2d0bb4c24a8364082a74dfae0c26e', '124715773a0b7b6d9ccf838cf8fc1ea6d23c03d21731408a38bf7e830abc8047', '5b1eefe5b0cf1d5a3210546b4a945a9b2b0f31b866e4491cd2c20ee4a24a9f10', '170cd73f4bf3446f989eafc487d3e5390454a01ae289093fc15e151383a96dfc', '03645bc34ea403cc4df7118f0e79baa03994e64a18409629e95aabc5ca68e18a', 'd08d9b1fcf4b9847030c93c9ca455b7ec62dc6b171ae17879537fd0ba6a9c90b', '7164430dbac0bee67b621ac2cbd21cd8cea308892e412504a472cb2a0fc724d8', 'ef1305bdffda25c81f2cb9523eea29cf88c63528add6bb292cc457ed1fd93139', 'a896b5627b8189bae2d87f94f49940c6423c7c381fc7e6c185c1e590c0ab87e9', 'f505207237216f848f481de4d27f077e2849041f0ac22d9f4189da2eefb94470', '0729fee4f0650d619ee606e9cc2ddadcc2f30e1167a12c7fe45ff1f786736683', '4518d80858fef07bed62cc35417db446810cedd899982559c853759213289850', '5f386827a4be1fdd297c029c0daf31c11be49fc79689c29a49956ff824b69ce8', '4a0e2df572c09fd1565dc4ca2284dc270cdc3b1eff7c600a943fc27aebeb60fc', '32a37eaac6f4ff49d71546b4c5f7a320529263ed7e0991bb04eb042c937591a6', '4bc6f705287e593e2bb8b87f6e879cbdfe48f0aa99f66fdfe565e3ea05068e4e', '2a589047e4dfe9289187b5751f1caf22ef5b688feaec1ff553f69ff79af372b1', '0640f5b77d24ed51f1690c73c62cd528e7139bdad10c20411147124d5d9871b0', 'cdb74e2f4e5413fc6cd0112db5399a5f308709350203850fafd7256000b80010', 'c59bf50879d36f923999be41fd895b7b794e3ce25c530c9b40aab85996455ed2', 'b6f9483dd3b967c0882852ce05a43c16ff0fbbd47b0a872c1eb6f023fe01eae3', '06c8d642eaff4e900844fee899b175ff5a236c172f7545eae203692e5986c03b', 'bde2108333d32500cff2a3f3af5291723f80a679d17fceec52bc774a55041b47', 'e85d1dfa5f74eeef5694dd3d3335208343124884a50fd86803494b48a47fe7b6', 'b5de065e7c39116de04606cd30f11e7ee589bb1a5983656ee52f18a7cb592a12', 'c3727d4fc88301d7745c6d35d1bcdf53dfef80afc2670d50456a79855c517243', 'f914ecb52ed9b78f809eba2c36a21c1c84746073fd7dd2440d531fbe0012bf88', 'ff759867da72cc06ca43ab7ecc712ae63879210502cbbacbd8ba89fe9d5b5a0a', 'bf2e6836b7debb0bd49073f07eced9fdad4cfba53e099cee7d817606bb77a352', '51a297b82b14fda4b281a8b5c7d9468a4b42576d5ad188a86017874d21220c02', '03152d5a8b79b5fbb094f50cba237353134d07c212394743115c38110f208d9c', '4126f980fa971eddc3cd6f79369aebff0906a92e050623fdf14764164daff7f2', 'a7fdcf32b58b83e368b5220ac17368dc656abc54a1eb2052cc624545e170db49', '12bb6f80adf87a7aa6d64732725843844b7a5986da857c1c085f6043a2cd2c68', '1b13e6e52b68345e411c6baf4cc0b90062e5495d8fd87773a23da0ca847412b0', 'e4651e38dbd8aa7441dc80aa271f3c758071c562312b654b2967f2cde7353f05', '5a4f5c5320864fe050a209f4ceefd3dbfcf437cfcc90fa0f6049dcd0ea224e1c', '3595db4ebc44621933418243db1776aa13a7326f210121868e27e185b86911ac', 'a8cfbc029964b7d88df4fae0bef07844ba8a105a6958ca0924d66854b4f88c4c', '18938ca4c106e3591d160dd62301f4461c884068af66a483abf651eaa719377d', '3f5e692015343e96d6d9fc519c841fb7de02c7edd3b4ed7010bde6faa3741746', 'f8b35cacc68879bd6794dd581b964f5d6a51fd8d7fa7b8e924790b2a72207733', '993399c97855cec203c3b789d2996e950063e7b420090382ca2ac0ead0ce5cd4', '43b5b80ef82a12eb69276d8e1fd4bc9159c038853368c5ac8190a045f6520747', 'db1613badb300f3a2647f52e8d89f4d26a05a4348c4756df1b190458bda27c78', '1094edb498815f159102d3004d31e25ea68ea392016998413907d928d2ab7161', 'f75bdb5b46c8d6d04a6129b90819e67bc937c1f0a979d77b27174e733f0e8191', 'af80cde84fd930286b5ca5c7b4b1d029bc037ff1f72674f748027dee46080ac6', 'db5494fe3b7d9e021b3afe01d2194a6156831e7e8b910bebce4b7e020a818fba', '155bc391d435d2fce1b11a6e6fecc90e5f3dee43eeff3bbdf3501159d093d0ab', '11c9fbb202791f28690f67baf81dea9132ddb335ab698bb4b0c4791484d14c23', '8664a3039ab7c5b95f5121a18f0ff40b67b81cf5712e51c13f7b5468e33d77c2', 'd50ff8a96e28d8d1a8bc037ac04c06f0f9b7fd680f90bf879fcb3ab53171752f', 'c1c9df54ce955e12ad92b42d6aba3697a64ab2162cf1a7a34946d4e3fe49826a', 'a3bc77eba33b643a4ade64fe21805bee3872acb30f7e9fef6526bf44a3c6b2ca', '3ae32c067bf07e0d0924f762b1d0992c5680a9b046cc251f4d15c2288729219d', 'f654b6d8bbee1b709b87f97a9d7c3a947e71091fb07aca5d4d9a968688bb9683', '93be2b4afc856829071c3aadac739e4b0d1ce22c4dfd0124d2f94dccbe611f74', 'd23aa1028edf6cc18cfcdee7038f13ace3217c61b9c63cbf6f5dd1b76680880c', 'bdc20b6c53d3a05d7d0fca4337cfaecd13e23cc66bd278f230abef75a6de23c3', 'ca265608d0a8e79fe15d34bbc8575a54926ef23752d7cc979c8e98c2991e1147', '206bb582b890098d2d423de101a4eed70802d4a6b9649a1ae2eaf6f61a104399', '15305a96f52910092400c0e32424c9ef070808912fe0bfec245f9d0afa6fc2f6', '34bdb8bba3c3974f6b4215fdcbd7972a85c20cca016e66b95db6373a8930e301', '7795550c0c81e2e4b80be8244f4e4ae75b452ffb1543920128eeb41aad36a47e', '62e988e265af0cbc15635569cd1ad3b56d174667d89f6283edf6ec43bbb80e6e', 'cf72beb01f7aab99b3df941a91c8641484d164d48b6ae8106dd5cea103b29619', 'd544778dafdeae1753a78ecbfe1cece47606ecce3f5715e5c400383958a9cbc7', '0517a9a7184cecb0c6386d23fd2e025b34936c9e29444ca2677fbd00a04cbff2', '04b48d58b7b785ee0f3ef9d20f2e2f2b19af56f19e101bd734fd80a085f9176f', 'b2c2b6d94bf6bcf76e4990f1c87e82062f4b4245bbb3908fdba602fa2c0e7e44', '8fef7b8201fa100eab82ab293f79f6c0e99915e322b797752a16eecf6cf0f515', '18afc5167d3e815c80cd0742f615dddfebee2a2f5e8285015b23b8d134292a5c', '144af39bac3bd8a035db705893d65371104ff71be0079d10d93d23519df88237', '1f3615e8caf8b880db1fd1f8e3ba65f00749c06550f929caa0bb76c070c67e71', '46de8f3bd1f5b322478a8666a0103c4d2371149072ed774619491114a8c7dbb1', 'e9ed8f0e1569a00d2a4ae3c7951b44b5fd5f7ac59c39a9576816a7fe08cae9b9', '293aa707d93d65cae33e59bd472d1513718d395786ecf3b6ec6bc5ec751cb3bf', 'e560a2530d9801b384f0e6391faedc3a74d4a95ca04bb1007d4cffd778631baa', '84ca8d06fbc60ae85e821e1784252e39782f34da089d934e32deee6a9e26f120', 'c9a1d6c3c1e4aa6e6e292fc1444e4799b63d0a4fe8d1932a2405d84bb889f847', 'e192187b50f10b576d4c67ab41e4627aa80da4d9abf7dab8a8f32c2c1c7ad6fb', '8f880e6195a877c2045eec3b81dfbb6d5a8b29ab1d02d932aa60cdce7546670c', '55c13d9a2eebadf1f7f012aefae5b1992bc4c931ce94958a7b2ae923bdee071c', 'b5ec0befd6646ee77f5ba6c6ebb28f1ea21425ad243653e91398d40c01cb2933', '4a2396cf0b33df506e27f515b2e2fd9bbc358f5926bfe465f4706e8987d86100', '5ab6f54f091ab8a1f113bf49d7dc7cc1049cb78242889978fcadc4414f369b89', '8b316dead8f6f0d97d3c946017b94f78ed576eabadb0972715b958ea26e2e85d', 'a9f0cb538e7de2e733935e56a1d359904b3062ff34c429b5cde5541be06a2281', 'f33f0aec9c218bec731c0d1afaa8b943df88b8da89c986f10ba7da22b87024ce', '490570eb71ea2404d86c38d91dd44a9f5e1a31dabaf45fb411123e11bbe0c32a', 'b40e67ff4ac2dfae4278c79e0bb2849560dcc6fd36344733314734a6d8ed595f', 'bd342e500bbb93bcbfdae615c7eafcd8ceb8d832ecc9259474e08e06d10fe3ab', '1c2b73eb3ebb46130bdbb8a834d43c5cc255598ae8e4b7c8e7d003da00bb4728', '9307ec2a74d6c72b4757662b022773a3fbaa44b54ddada556b43b6ddd64b9776', '93f5db49fc5960530d2bc84af38532ac2ddb9f9adb353f15b93206686d6a156e', '9b2146056133b4acbd8bad195fb243be0aaa02697db95eb26157d10df7521c78', '896325f4d141ad3cb25b5745ff1ecaab36818e6ecafb5eddec713838c15a4bd6', '51a5276253800685948ffaac97d285908228f2acfada63514d70a09e28b01188', 'ca789858b3319b61b641822ee5b30161db35921f3cb6199133872fcda34ccd69', '25c8a91e93f8eda1f12d4672ad9caa53675c33ce0b0b5c83e4cc43b71812d749', 'ca2846748c62c87fec5764af7dc5363895cb26a6daf370b5800bad2273fe322b', 'ace1f0b93a52d3d2ed5ff18c0b85a74e941bcdc7ef6b4a6978c7a26ca593cacd', '07e67773390a5493a7a529ae25dce73a46232d15cfa6f8a15744b01168d6775f', 'c3d092976f58c5f88488afa899539bf0adf6a04030b0c57027c493374acb30fd', 'ccde173b300297e6f843b8e053be534bcf673c36ee6ba9374a13888efd804504', '5ef6669c9d6214d3ebff1828320de9bd55003170c68da75bd46b96536ad9c4a6', '11cc81c9036d6f541b6b0b1ce1dea63db29e85115720efe4d027f8129ee0aeff', '0e6c1244cc7f8c0e50b9864d7c4c3150c217ae7e3cafe3c157f2514a1fa90363', '8ff47c7b9c4dccbd58d48d6d1c59141317d905311f02ef28ca506343e6685f9b', 'c4f15139af8d2a33e30906991f51d854b2384093b0ee178a44ff48eec3a1b510', '05c7013dd688dee2795a36c2b4a2fc2164687c1e7fb1b2c6ac9d0e7848b07532', '65dab747ab5d94eea23294268085c886d975da7a5b1e1cc407d147c82ee32049', '8c0d1c691c7f2d70bde1d39a4d9402319598b3b70a2de1f5422c1c556385efa3', 'da89e85d6e182d9be05b51d42f392e3209a919053ed71ccd23882dbbd92a2f86', '08022e5a36af37ba7f9a3418b0c1db3699346df88df146fc3bfd826f26955679', '4f0d8a2e2d97f9051f80ea84f30630d60387d00814499f4463297532826461f5', 'c85ba5647cfe1d94bb347a5130fdd51b9e530df11864b41a0983ff7c132b7a92', '9541646380aaa9014bf80d4891e461e0a9c7e175eac67765249a1c1311c095d7', 'caba377d4e165ca8f594bebcd8105f6183eb449510ccb2fc452b844bc7906726', 'fc41b2cdf66c1e40207be0e2cf92ecfddf09e89d8555cfcb573556fa9257d1a1', '5657566d9f4bbdbd16dd4303d9c37d0d78e5f9dd7e7b197707a56e666b843f92', '5a05219597f9d9e264eca34945323044951ff33270e1ab35c914a312d9a5c8fe', '4ad368831729b7a925e8afc73d13abeb528ba82ac272aa1f0516a0c02f0bf9ba', '9992522616b8d415ce110c1473891ac23af99c8ab50e11de26660eb1b8dcef88', '3d811bc16b4d8cfbfe3a38359d1451b360cd2998b5b51da5b0672449badf3f25', 'ba9ba790f832ee23071310dccbf46f9cb21915ea00bc39dccbe9417db6138678', '6ba745068f8d504783f682a90f07874160c3f061130d0dade51d911279d36359'), IF(amount >= 5000000000000000, 1, 0), 0
FROM Transfers
WHERE blockHash IN (SELECT DISTINCT blockHash FROM Blocks WHERE eraId >= 1079) AND fromAccount IN ('608b12ea61283eecd066a06644bafcbb65fa8057aa53d57db3c951d5c45bb6e2', '57ae818eadf5da683454d07254e76f13d412a15e410fbae7d1b6fa2263d86631', 'd9fcf0a5eb772023b32f2a862eee723887c99323b6613f779b00795d4c739538', '4d6f9b7f5aee58f84911b34eb5222e766c51147ff92a9b1105544bac4d3d8b04', '5288513b9df476a252fafd17d977c50cd9dadd83804d38f328b0d68d6ff1a033', '53d830344dfe58f4b6c98dc386e09b65031cd9ed6bfeb07e6dcd5eef2d636e0e', '02f1bafd41008d9b8f4d896a1ed3252b4b834313314d8a394f40d41b908181bc', '81104f809faaf0bbaef5d6edab15bebde04c334409fe248db746201f30f58df4', '1bd85ea9fb9632b3b7c4c5d9d84568f9859fb98e0a3fed4335b893e9cae24e6d', 'e717e53ca56139a6877e32c24055886dd1992a1057163f8d5dbcdac31aa0abc8', 'f4c035ea002e32dc11938405f5b1f1cf8792dc60a6588f738d8a1b18cb86b68e', 'e75017e71e67297923d7f1e1fa7f8de0fd45b60e1d9dccb963ffc30eb7bb5830', 'f88628f3be63d0c8db1d22857389a30ac445e0d75772cf3217feeb797ff8d6f4', 'ec1aaab16cb1f04efc08b2580326c4a350805c2bca5710f122ba341a56bee656', 'd9bb880df9221ebd9e9c8a74c75f06c92f0f56a320e306eee2939e061a619df8', '24b6d5aabb8f0ac17d272763a405e9ceca9166b75b745cf200695e172857c2dd', '847ed21b6581c604cb3cfc4d88f94fdd03c3f0cb3b74399da50261dafdf1a06b', 'f056858aefd247a039872e6595e295db0f8f30f516db2b9b99bdb711b937fe6d', 'b7e3617083ec93d15ca8d6a570bc9b9b8508b3a877c9cf94fb3d327a69f33b7a', '6c07fc04adb4029049536144c04b07d7be8a32650604c7c0f18fa8fd89a4d1a4', '4420e6b0024a7c44001b6b454243850ef31d1f07036006f417b14bcde12514e7', '4fecb907e6af44b1d982181e2eaf409b5a84c88393bf4c358357139b6be55785', '49ade8ee1c4a54c7c799846ac5ace380134c3996f2ff28b4617cb8ccc4fde058', '32493614943b095b04391171b442d4d52648cad56f66e296c7fb96bf224785c4', '26a0b90541a7d0bc521d7543bb295a67f2b1289f83e47138bd75e9d09dcd44c1', 'f368b795b05445420064b67076bbf60b3a6ad8731b0228488c0bdcbb3004aac9', '8524303234c6d876f232cab27ef14956580df2f6853141fc795901a94630d1b8', 'dbbab1ca42a5416c1547a3e17fc6346f995e86ad15c9edd26d9326d042f91d98', 'cefcd0d99ed2e9bb621578b785931816e75cf7cf3e2e030eebcf73191e908eca', '541fe25a61a426958c9ab867e5c57fab42bf1e9217b37999028cd0ba35a3bcaf', '84fe406504a1c85e6680e19d3b80ce6f0c312fb7f2ecfcd2d04c8df8818589c3', 'cc83f27747ef06bbbd5bdf1244f8f5601c5027f3d1963957d11a8c8eafadfaff', '9fb3803b335f14b083b97400e57d5c8e8ad0ec5859a51225b6611e34357c8d77', '577ee1033a134cf21f2aac5adeec11e8aa038417838f0c28bb9dced8856bd7ae', 'bcfdca815487763999ae0de93f0fe30991cbe52f9f5c0d46fa5fc2b8281b8331', '8a0aaa01f6d691aa33af7f86d0839f4a5090d0fc449a6da8abcc78700cf029fe', '46586af38f068769c6911fedfae82effb05635a3e33ccd50ec01be41b862bdaa', '7438ad169ceec12806d3343598cb21d29357b2278c005cc3f9e71480e378d758', '6ee862e976a99eed1c517bbf7f0d3e97f988f1cf12f3b8e347c033ac9ff745d2', '416c86c13f5dcc4aa0c553407e9bf15004ba4ebd296cf95e16b183df1f7dc5d7', 'ba8043ac5d8b06a9b7e52215ad5cc406bbdfb88459f9fb8229a48c55cdf95b46', '4e1e5c580cfda47e8f466be3719c3a5a529e62740030f56b9f433212929630ee', '85930bab3c3aa081a60b447c374ec0e81f847ea7612222e08a5c847ff2685f16', 'd5033499bb2e22a0b316a72b87169c11a08c06e87964e80d4e222d3dd8d133a8', 'aae51c8d533673728a18e141434a04b9d77dad9e00da337ae524a2606cd15461', '91733e84d9fcfa39fd5e7187ba067eb9f48fd41b8d053b23e635747444a8098d', '65ee0b0a2831fc5ea86a928f5d93d1a8b599032d36f303e6aadc0a1fe7cf91a2', '8b68483349bad3af9cc5bce15fc8cde02c4683df39d741969f3d4e1d49e0f06f', '501ddbb4cacd5b4a9ce3094aa34deab7a0c57b89d05185abf937f3afe07043d8', '3b126fd053336ed013fea41eec61f8d7480a6df86ad5840ec529eb7fdb203d27', '41a5d1bc379d235fa0e745b04eb32af590ec064279c8d44f50865e55f8347836', '9bdcf9bcdb8d155cde18f9216944a3eecdaadf46438e94059d4f3c41ab0516df', '058522f614e0dee1e954086eab1d04852f21f2a076043ef49aa537ece6d46a23', '9f59c3595bcb096bf9774b0d7d18dadf1a8fac507030b196414e9ae83c546bf8', '56d67580db086fd8f1547ed19e506a193ac7548693baa88a20fb570248759df1', '69edd622650021ce86a533767e3ddf66e5c39331b0cb1488352194792ff62ccd', '4a19db8df0a8336ec41e19e0a36e89edc40b7c8940b05c2f5e5e7015aa51ad78', '762a3cc23b3b46b42bce1b503ff6b45e9c8762ffb0292a09600c5adcb9bff578', 'b8e119b446f65536e4cc213fba4a0e38533007ae5dea52c4618a86647ccc873a', '02faaa3d8155039a88589d531f8107335476589c2e920980a6981f905671e20d', '8c15bba2d147859c7b7a8f43028eeb4d3c9571c6e36dfecc97c77463d3af08cd', 'b55b02323e4d9969d16c72e00cd93e8f3dfa852ca50bf3aa51a9c8399ca3047f', '4e542609e2ab3d38abb2f444fd260c18f9edac47d60c12f1fc6ac104c733ee2e', '4ec7508d7491dcfa75a99092dc7e26c7737931ed2bef0bec2a4822650d0d1836', '3786078ffb0eb0d14af6bd230c1e3bb06410951d62e6638b066999d9384fef2e', 'c44288ef2e0be8c310edbc74799bde953a1ed0326297545bec327db8f9ae6e14', '115a03652334591a36792dcf2fa583ab9f8decd190f0f9f503fbf38f0c948c36', 'b4025fe8e24f008ba2dd93d8faa3c42ebac14358dbc671e774cb787915dcaa06', '473bd11d572cf3741599f6a3593a49124439b4e5aeeea5865e4867f152bfed3a', 'e5a8f6acbe2247da874f8919240895981761d714d5aae0f82ba439005d609b6f', '7cdfcb2fd3ac6db74d271c79ac7b60fff0dfa609c5029a81fad7eae327793f99', '8aaa5049c0472762b77c4a2d8070e3a232c209a2a4a6d6a0f96d4275993bbe7b', 'a7e00310794fb4f210af059bda2e35e1468e3055a068371233db3e05867487ec', 'cbae6e7474ec4f3da95ea8091bb9a3738c8422dc48e93fc062166450516daaff', 'ecde001730c1af150d002262f2e0126cefade8d02ce713ee93b8cc01c6633d53', '24fb912e940d97bd7e7040a57ece41efb0a925fb71a7c55f0b64bc7d6dd1a45c', '8dd65e4c2c51f9c16a4089d2581c95203deb9c1620d7bdee2cc5e13cb0d74a93', 'c775657a3cccc3e9e93190292e5282602fd6f2a393366411df9d4ecb3b4111a3', '6a7b79827e0d753572a73da4cae9a93777299c0dce9ab5d2bf41c068bcb7dca8', '2e7eaac546debfd36b6f58342a1f1a0a7f03a4bec5c3b73aa33d478241423ea7', '617b3d821c7a3b38c6397b9cb155050b72e1e324b6e4d82702d622e8a1e04da1', '51319645a7de2e35ce5fa6c3a6884e75583d79499306166bd819e2415e64fd22', '20249530fc505e1e486de8e3ad82690569d23afae5748365523b526d524afda5', 'b9f8b0534497c074cf009e6e524f8bb078e8ff9e6608e7b5516fa48301eb253c', '91d5d28b69feba3fdbef4acd749bc4947ab0c235eba37053aa7b72c34afda7a4', '67110c7905664d95692a99e7219b7f0820cb6a8b2a0dee17a5cc51699a152e1f', '72896e02fc9d9d599ed7f62d65a70cc32bc0d3bff0340a9987f83ffbad99b707', '335a1df397da448223a66a1ae827fbd600cf459957db232b0b1b5c014868008c', 'd75bfb80102ea1e1835289b39bf7c5febe72a35fa1c3c3ab9042e10125882885', '7bca869ed387885e1e9c3ae60aae0b45c0ee58554af87ae6486b56cf661e8d82', '59861ff8b6e75ad8e3c6c253d7f44531ffa3d5c090bb0cdab633456599eb2662', '5dcabc5635685801551c7bf712e408e1367f908a99417d91586bb4daf169f653', '82ea11a5b25ad04ac79f727e20b1c957ba0fb1c28f423ebae3f7ad197d0367a8', '71d1c92656ea200c2d7ffc3c6ab952f0f6e2d0bb4c24a8364082a74dfae0c26e', '124715773a0b7b6d9ccf838cf8fc1ea6d23c03d21731408a38bf7e830abc8047', '5b1eefe5b0cf1d5a3210546b4a945a9b2b0f31b866e4491cd2c20ee4a24a9f10', '170cd73f4bf3446f989eafc487d3e5390454a01ae289093fc15e151383a96dfc', '03645bc34ea403cc4df7118f0e79baa03994e64a18409629e95aabc5ca68e18a', 'd08d9b1fcf4b9847030c93c9ca455b7ec62dc6b171ae17879537fd0ba6a9c90b', '7164430dbac0bee67b621ac2cbd21cd8cea308892e412504a472cb2a0fc724d8', 'ef1305bdffda25c81f2cb9523eea29cf88c63528add6bb292cc457ed1fd93139', 'a896b5627b8189bae2d87f94f49940c6423c7c381fc7e6c185c1e590c0ab87e9', 'f505207237216f848f481de4d27f077e2849041f0ac22d9f4189da2eefb94470', '0729fee4f0650d619ee606e9cc2ddadcc2f30e1167a12c7fe45ff1f786736683', '4518d80858fef07bed62cc35417db446810cedd899982559c853759213289850', '5f386827a4be1fdd297c029c0daf31c11be49fc79689c29a49956ff824b69ce8', '4a0e2df572c09fd1565dc4ca2284dc270cdc3b1eff7c600a943fc27aebeb60fc', '32a37eaac6f4ff49d71546b4c5f7a320529263ed7e0991bb04eb042c937591a6', '4bc6f705287e593e2bb8b87f6e879cbdfe48f0aa99f66fdfe565e3ea05068e4e', '2a589047e4dfe9289187b5751f1caf22ef5b688feaec1ff553f69ff79af372b1', '0640f5b77d24ed51f1690c73c62cd528e7139bdad10c20411147124d5d9871b0', 'cdb74e2f4e5413fc6cd0112db5399a5f308709350203850fafd7256000b80010', 'c59bf50879d36f923999be41fd895b7b794e3ce25c530c9b40aab85996455ed2', 'b6f9483dd3b967c0882852ce05a43c16ff0fbbd47b0a872c1eb6f023fe01eae3', '06c8d642eaff4e900844fee899b175ff5a236c172f7545eae203692e5986c03b', 'bde2108333d32500cff2a3f3af5291723f80a679d17fceec52bc774a55041b47', 'e85d1dfa5f74eeef5694dd3d3335208343124884a50fd86803494b48a47fe7b6', 'b5de065e7c39116de04606cd30f11e7ee589bb1a5983656ee52f18a7cb592a12', 'c3727d4fc88301d7745c6d35d1bcdf53dfef80afc2670d50456a79855c517243', 'f914ecb52ed9b78f809eba2c36a21c1c84746073fd7dd2440d531fbe0012bf88', 'ff759867da72cc06ca43ab7ecc712ae63879210502cbbacbd8ba89fe9d5b5a0a', 'bf2e6836b7debb0bd49073f07eced9fdad4cfba53e099cee7d817606bb77a352', '51a297b82b14fda4b281a8b5c7d9468a4b42576d5ad188a86017874d21220c02', '03152d5a8b79b5fbb094f50cba237353134d07c212394743115c38110f208d9c', '4126f980fa971eddc3cd6f79369aebff0906a92e050623fdf14764164daff7f2', 'a7fdcf32b58b83e368b5220ac17368dc656abc54a1eb2052cc624545e170db49', '12bb6f80adf87a7aa6d64732725843844b7a5986da857c1c085f6043a2cd2c68', '1b13e6e52b68345e411c6baf4cc0b90062e5495d8fd87773a23da0ca847412b0', 'e4651e38dbd8aa7441dc80aa271f3c758071c562312b654b2967f2cde7353f05', '5a4f5c5320864fe050a209f4ceefd3dbfcf437cfcc90fa0f6049dcd0ea224e1c', '3595db4ebc44621933418243db1776aa13a7326f210121868e27e185b86911ac', 'a8cfbc029964b7d88df4fae0bef07844ba8a105a6958ca0924d66854b4f88c4c', '18938ca4c106e3591d160dd62301f4461c884068af66a483abf651eaa719377d', '3f5e692015343e96d6d9fc519c841fb7de02c7edd3b4ed7010bde6faa3741746', 'f8b35cacc68879bd6794dd581b964f5d6a51fd8d7fa7b8e924790b2a72207733', '993399c97855cec203c3b789d2996e950063e7b420090382ca2ac0ead0ce5cd4', '43b5b80ef82a12eb69276d8e1fd4bc9159c038853368c5ac8190a045f6520747', 'db1613badb300f3a2647f52e8d89f4d26a05a4348c4756df1b190458bda27c78', '1094edb498815f159102d3004d31e25ea68ea392016998413907d928d2ab7161', 'f75bdb5b46c8d6d04a6129b90819e67bc937c1f0a979d77b27174e733f0e8191', 'af80cde84fd930286b5ca5c7b4b1d029bc037ff1f72674f748027dee46080ac6', 'db5494fe3b7d9e021b3afe01d2194a6156831e7e8b910bebce4b7e020a818fba', '155bc391d435d2fce1b11a6e6fecc90e5f3dee43eeff3bbdf3501159d093d0ab', '11c9fbb202791f28690f67baf81dea9132ddb335ab698bb4b0c4791484d14c23', '8664a3039ab7c5b95f5121a18f0ff40b67b81cf5712e51c13f7b5468e33d77c2', 'd50ff8a96e28d8d1a8bc037ac04c06f0f9b7fd680f90bf879fcb3ab53171752f', 'c1c9df54ce955e12ad92b42d6aba3697a64ab2162cf1a7a34946d4e3fe49826a', 'a3bc77eba33b643a4ade64fe21805bee3872acb30f7e9fef6526bf44a3c6b2ca', '3ae32c067bf07e0d0924f762b1d0992c5680a9b046cc251f4d15c2288729219d', 'f654b6d8bbee1b709b87f97a9d7c3a947e71091fb07aca5d4d9a968688bb9683', '93be2b4afc856829071c3aadac739e4b0d1ce22c4dfd0124d2f94dccbe611f74', 'd23aa1028edf6cc18cfcdee7038f13ace3217c61b9c63cbf6f5dd1b76680880c', 'bdc20b6c53d3a05d7d0fca4337cfaecd13e23cc66bd278f230abef75a6de23c3', 'ca265608d0a8e79fe15d34bbc8575a54926ef23752d7cc979c8e98c2991e1147', '206bb582b890098d2d423de101a4eed70802d4a6b9649a1ae2eaf6f61a104399', '15305a96f52910092400c0e32424c9ef070808912fe0bfec245f9d0afa6fc2f6', '34bdb8bba3c3974f6b4215fdcbd7972a85c20cca016e66b95db6373a8930e301', '7795550c0c81e2e4b80be8244f4e4ae75b452ffb1543920128eeb41aad36a47e', '62e988e265af0cbc15635569cd1ad3b56d174667d89f6283edf6ec43bbb80e6e', 'cf72beb01f7aab99b3df941a91c8641484d164d48b6ae8106dd5cea103b29619', 'd544778dafdeae1753a78ecbfe1cece47606ecce3f5715e5c400383958a9cbc7', '0517a9a7184cecb0c6386d23fd2e025b34936c9e29444ca2677fbd00a04cbff2', '04b48d58b7b785ee0f3ef9d20f2e2f2b19af56f19e101bd734fd80a085f9176f', 'b2c2b6d94bf6bcf76e4990f1c87e82062f4b4245bbb3908fdba602fa2c0e7e44', '8fef7b8201fa100eab82ab293f79f6c0e99915e322b797752a16eecf6cf0f515', '18afc5167d3e815c80cd0742f615dddfebee2a2f5e8285015b23b8d134292a5c', '144af39bac3bd8a035db705893d65371104ff71be0079d10d93d23519df88237', '1f3615e8caf8b880db1fd1f8e3ba65f00749c06550f929caa0bb76c070c67e71', '46de8f3bd1f5b322478a8666a0103c4d2371149072ed774619491114a8c7dbb1', 'e9ed8f0e1569a00d2a4ae3c7951b44b5fd5f7ac59c39a9576816a7fe08cae9b9', '293aa707d93d65cae33e59bd472d1513718d395786ecf3b6ec6bc5ec751cb3bf', 'e560a2530d9801b384f0e6391faedc3a74d4a95ca04bb1007d4cffd778631baa', '84ca8d06fbc60ae85e821e1784252e39782f34da089d934e32deee6a9e26f120', 'c9a1d6c3c1e4aa6e6e292fc1444e4799b63d0a4fe8d1932a2405d84bb889f847', 'e192187b50f10b576d4c67ab41e4627aa80da4d9abf7dab8a8f32c2c1c7ad6fb', '8f880e6195a877c2045eec3b81dfbb6d5a8b29ab1d02d932aa60cdce7546670c', '55c13d9a2eebadf1f7f012aefae5b1992bc4c931ce94958a7b2ae923bdee071c', 'b5ec0befd6646ee77f5ba6c6ebb28f1ea21425ad243653e91398d40c01cb2933', '4a2396cf0b33df506e27f515b2e2fd9bbc358f5926bfe465f4706e8987d86100', '5ab6f54f091ab8a1f113bf49d7dc7cc1049cb78242889978fcadc4414f369b89', '8b316dead8f6f0d97d3c946017b94f78ed576eabadb0972715b958ea26e2e85d', 'a9f0cb538e7de2e733935e56a1d359904b3062ff34c429b5cde5541be06a2281', 'f33f0aec9c218bec731c0d1afaa8b943df88b8da89c986f10ba7da22b87024ce', '490570eb71ea2404d86c38d91dd44a9f5e1a31dabaf45fb411123e11bbe0c32a', 'b40e67ff4ac2dfae4278c79e0bb2849560dcc6fd36344733314734a6d8ed595f', 'bd342e500bbb93bcbfdae615c7eafcd8ceb8d832ecc9259474e08e06d10fe3ab', '1c2b73eb3ebb46130bdbb8a834d43c5cc255598ae8e4b7c8e7d003da00bb4728', '9307ec2a74d6c72b4757662b022773a3fbaa44b54ddada556b43b6ddd64b9776', '93f5db49fc5960530d2bc84af38532ac2ddb9f9adb353f15b93206686d6a156e', '9b2146056133b4acbd8bad195fb243be0aaa02697db95eb26157d10df7521c78', '896325f4d141ad3cb25b5745ff1ecaab36818e6ecafb5eddec713838c15a4bd6', '51a5276253800685948ffaac97d285908228f2acfada63514d70a09e28b01188', 'ca789858b3319b61b641822ee5b30161db35921f3cb6199133872fcda34ccd69', '25c8a91e93f8eda1f12d4672ad9caa53675c33ce0b0b5c83e4cc43b71812d749', 'ca2846748c62c87fec5764af7dc5363895cb26a6daf370b5800bad2273fe322b', 'ace1f0b93a52d3d2ed5ff18c0b85a74e941bcdc7ef6b4a6978c7a26ca593cacd', '07e67773390a5493a7a529ae25dce73a46232d15cfa6f8a15744b01168d6775f', 'c3d092976f58c5f88488afa899539bf0adf6a04030b0c57027c493374acb30fd', 'ccde173b300297e6f843b8e053be534bcf673c36ee6ba9374a13888efd804504', '5ef6669c9d6214d3ebff1828320de9bd55003170c68da75bd46b96536ad9c4a6', '11cc81c9036d6f541b6b0b1ce1dea63db29e85115720efe4d027f8129ee0aeff', '0e6c1244cc7f8c0e50b9864d7c4c3150c217ae7e3cafe3c157f2514a1fa90363', '8ff47c7b9c4dccbd58d48d6d1c59141317d905311f02ef28ca506343e6685f9b', 'c4f15139af8d2a33e30906991f51d854b2384093b0ee178a44ff48eec3a1b510', '05c7013dd688dee2795a36c2b4a2fc2164687c1e7fb1b2c6ac9d0e7848b07532', '65dab747ab5d94eea23294268085c886d975da7a5b1e1cc407d147c82ee32049', '8c0d1c691c7f2d70bde1d39a4d9402319598b3b70a2de1f5422c1c556385efa3', 'da89e85d6e182d9be05b51d42f392e3209a919053ed71ccd23882dbbd92a2f86', '08022e5a36af37ba7f9a3418b0c1db3699346df88df146fc3bfd826f26955679', '4f0d8a2e2d97f9051f80ea84f30630d60387d00814499f4463297532826461f5', 'c85ba5647cfe1d94bb347a5130fdd51b9e530df11864b41a0983ff7c132b7a92', '9541646380aaa9014bf80d4891e461e0a9c7e175eac67765249a1c1311c095d7', 'caba377d4e165ca8f594bebcd8105f6183eb449510ccb2fc452b844bc7906726', 'fc41b2cdf66c1e40207be0e2cf92ecfddf09e89d8555cfcb573556fa9257d1a1', '5657566d9f4bbdbd16dd4303d9c37d0d78e5f9dd7e7b197707a56e666b843f92', '5a05219597f9d9e264eca34945323044951ff33270e1ab35c914a312d9a5c8fe', '4ad368831729b7a925e8afc73d13abeb528ba82ac272aa1f0516a0c02f0bf9ba', '9992522616b8d415ce110c1473891ac23af99c8ab50e11de26660eb1b8dcef88', '3d811bc16b4d8cfbfe3a38359d1451b360cd2998b5b51da5b0672449badf3f25', 'ba9ba790f832ee23071310dccbf46f9cb21915ea00bc39dccbe9417db6138678', '6ba745068f8d504783f682a90f07874160c3f061130d0dade51d911279d36359');