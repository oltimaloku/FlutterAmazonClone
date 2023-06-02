import 'package:http/http.dart' as http;
import 'package:amazon_clone/models/user.dart';

import '../../../constants/global_variables.dart';

class AuthService {
  // sign up the user
  void signUpUser({
    required String email,
    required String password,
    required String name,
  }) async {
    try {
      User user = User(
        id: '',
        name: name,
        email: email,
        password: password,
        address: '',
        type: '',
        token: '',
      );
      http.post(Uri.parse('$uri/api/signup'), body: user.toJson());
    } catch (e) {}
  }
}
