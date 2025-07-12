from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import time
import base64
import random
import logging
# from ai_services import ai_service  # Commented out for deployment

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

# Mock database for storing user data and generated content
mock_database = {
    'users': {},
    'content': {},
    'worksheets': {},
    'visual_aids': {},
    'assessments': {},
    'videos': {}
}

def generate_id():
    """Generate a unique ID"""
    return f"id_{int(time.time())}_{hash(str(time.time())) % 10000}"

# Authentication endpoints
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        display_name = data.get('displayName')
        
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        # Check if user already exists
        if email in mock_database['users']:
            return jsonify({'error': 'User already exists'}), 400
        
        # Create new user
        user_id = generate_id()
        user = {
            'id': user_id,
            'email': email,
            'displayName': display_name,
            'createdAt': time.time(),
            'role': 'teacher',
            'preferences': {
                'language': 'English',
                'subjects': [],
                'grades': []
            }
        }
        
        mock_database['users'][email] = user
        
        return jsonify({
            'success': True,
            'user': user,
            'message': 'User registered successfully'
        })
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        # Mock authentication - in production, verify password
        if email in mock_database['users']:
            user = mock_database['users'][email]
            user['lastLoginAt'] = time.time()
            return jsonify({
                'success': True,
                'user': user,
                'message': 'Login successful'
            })
        else:
            # Create demo user for development
            user_id = generate_id()
            user = {
                'id': user_id,
                'email': email,
                'displayName': 'Demo Teacher',
                'createdAt': time.time(),
                'lastLoginAt': time.time(),
                'role': 'teacher',
                'preferences': {
                    'language': 'English',
                    'subjects': ['Mathematics', 'Science'],
                    'grades': ['Grade 3', 'Grade 4', 'Grade 5']
                }
            }
            mock_database['users'][email] = user
            
            return jsonify({
                'success': True,
                'user': user,
                'message': 'Login successful'
            })
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    return jsonify({
        'success': True,
        'message': 'Logout successful'
    })

# Content generation endpoints
@app.route('/api/generate-content', methods=['POST'])
def generate_content():
    try:
        data = request.json
        user_id = data.get('userId', 'demo-user')
        
        result = ai_service.generate_educational_content(
            subject=data['subject'],
            grade=data['grade'],
            language=data['language'],
            topic=data['topic'],
            content_type=data['contentType']
        )
        
        if result['success']:
            # Save to mock database
            content_id = generate_id()
            content_record = {
                'id': content_id,
                'userId': user_id,
                'content': result['content'],
                'metadata': result['metadata'],
                'createdAt': time.time()
            }
            mock_database['content'][content_id] = content_record
            
            return jsonify({
                'success': True,
                'content': result['content'],
                'contentId': content_id,
                'metadata': result['metadata']
            })
        else:
            return jsonify(result), 500
            
    except Exception as e:
        logger.error(f"Content generation error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-worksheet', methods=['POST'])
def generate_worksheet():
    try:
        data = request.json
        user_id = data.get('userId', 'demo-user')
        
        result = ai_service.generate_worksheet(
            subject=data['subject'],
            grade=data['grade'],
            language=data['language'],
            topic=data['topic'],
            difficulty=data['difficulty'],
            student_level=data['studentLevel']
        )
        
        if result['success']:
            # Save to mock database
            worksheet_id = generate_id()
            worksheet_record = {
                'id': worksheet_id,
                'userId': user_id,
                'worksheet': result['worksheet'],
                'metadata': result['metadata'],
                'createdAt': time.time()
            }
            mock_database['worksheets'][worksheet_id] = worksheet_record
            
            return jsonify({
                'success': True,
                'worksheet': result['worksheet'],
                'worksheetId': worksheet_id,
                'metadata': result['metadata']
            })
        else:
            return jsonify(result), 500
            
    except Exception as e:
        logger.error(f"Worksheet generation error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-visual-aid', methods=['POST'])
def generate_visual_aid():
    try:
        data = request.json
        user_id = data.get('userId', 'demo-user')
        
        result = ai_service.generate_visual_aid(
            subject=data['subject'],
            grade=data['grade'],
            language=data['language'],
            topic=data['topic'],
            aid_type=data['aidType']
        )
        
        if result['success']:
            # Save to mock database
            aid_id = generate_id()
            aid_record = {
                'id': aid_id,
                'userId': user_id,
                'description': result['description'],
                'metadata': result['metadata'],
                'createdAt': time.time()
            }
            mock_database['visual_aids'][aid_id] = aid_record
            
            return jsonify({
                'success': True,
                'description': result['description'],
                'aidId': aid_id,
                'metadata': result['metadata']
            })
        else:
            return jsonify(result), 500
            
    except Exception as e:
        logger.error(f"Visual aid generation error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/process-voice-assessment', methods=['POST'])
def process_voice_assessment():
    try:
        data = request.json
        user_id = data.get('userId', 'demo-user')
        
        result = ai_service.analyze_voice_assessment(
            subject=data['subject'],
            grade=data['grade'],
            language=data['language'],
            question=data['question'],
            audio_data=data.get('audioData')
        )
        
        if result['success']:
            # Save to mock database
            assessment_id = generate_id()
            assessment_record = {
                'id': assessment_id,
                'userId': user_id,
                'analysis': result['analysis'],
                'metadata': result['metadata'],
                'createdAt': time.time()
            }
            mock_database['assessments'][assessment_id] = assessment_record
            
            return jsonify({
                'success': True,
                'analysis': result['analysis'],
                'assessmentId': assessment_id,
                'metadata': result['metadata']
            })
        else:
            return jsonify(result), 500
            
    except Exception as e:
        logger.error(f"Voice assessment error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze-image', methods=['POST'])
def analyze_image():
    try:
        data = request.json
        user_id = data.get('userId', 'demo-user')
        
        result = ai_service.analyze_image(
            subject=data['subject'],
            grade=data['grade'],
            language=data['language'],
            image_data=data.get('imageData')
        )
        
        if result['success']:
            return jsonify({
                'success': True,
                'analysis': result['analysis'],
                'metadata': result['metadata']
            })
        else:
            return jsonify(result), 500
            
    except Exception as e:
        logger.error(f"Image analysis error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Video recording and processing
@app.route('/api/process-video', methods=['POST'])
def process_video():
    try:
        data = request.json
        user_id = data.get('userId', 'demo-user')
        language = data.get('language', 'English')
        video_data = data.get('videoData')
        
        # Mock video processing
        time.sleep(3)  # Simulate processing time
        
        video_id = generate_id()
        processed_content = f"""# Video Content Analysis

## Language: {language}
## Processed at: {time.strftime('%Y-%m-%d %H:%M:%S')}

### Video Summary:
The video contains educational content that can be used for teaching purposes. The speaker demonstrates clear communication skills and presents information in an organized manner.

### Key Points Identified:
- Clear explanation of concepts
- Good use of examples
- Appropriate pace for learning
- Engaging presentation style

### Suggested Improvements:
- Add visual aids to support explanations
- Include more interactive elements
- Provide summary at the end
- Use local language examples

### Educational Applications:
- Can be used as lesson introduction
- Suitable for flipped classroom approach
- Good for teacher training
- Useful for parent engagement

### Next Steps:
- Create accompanying worksheet
- Develop discussion questions
- Plan follow-up activities
- Share with other teachers
"""
        
        video_record = {
            'id': video_id,
            'userId': user_id,
            'language': language,
            'processedContent': processed_content,
            'originalData': video_data,
            'createdAt': time.time()
        }
        mock_database['videos'][video_id] = video_record
        
        return jsonify({
            'success': True,
            'videoId': video_id,
            'processedContent': processed_content,
            'message': 'Video processed successfully'
        })
        
    except Exception as e:
        logger.error(f"Video processing error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Data retrieval endpoints
@app.route('/api/user/<user_id>/content', methods=['GET'])
def get_user_content(user_id):
    try:
        content_type = request.args.get('type')
        user_content = []
        
        for content in mock_database['content'].values():
            if content['userId'] == user_id:
                if not content_type or content['metadata'].get('content_type') == content_type:
                    user_content.append(content)
        
        # Sort by creation time (newest first)
        user_content.sort(key=lambda x: x['createdAt'], reverse=True)
        
        return jsonify({
            'success': True,
            'content': user_content
        })
    except Exception as e:
        logger.error(f"Error retrieving user content: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/<user_id>/worksheets', methods=['GET'])
def get_user_worksheets(user_id):
    try:
        user_worksheets = []
        
        for worksheet in mock_database['worksheets'].values():
            if worksheet['userId'] == user_id:
                user_worksheets.append(worksheet)
        
        user_worksheets.sort(key=lambda x: x['createdAt'], reverse=True)
        
        return jsonify({
            'success': True,
            'worksheets': user_worksheets
        })
    except Exception as e:
        logger.error(f"Error retrieving user worksheets: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/<user_id>/stats', methods=['GET'])
def get_user_stats(user_id):
    try:
        stats = {
            'totalContent': len([c for c in mock_database['content'].values() if c['userId'] == user_id]),
            'totalWorksheets': len([w for w in mock_database['worksheets'].values() if w['userId'] == user_id]),
            'totalVisualAids': len([v for v in mock_database['visual_aids'].values() if v['userId'] == user_id]),
            'totalAssessments': len([a for a in mock_database['assessments'].values() if a['userId'] == user_id]),
            'totalVideos': len([v for v in mock_database['videos'].values() if v['userId'] == user_id])
        }
        
        return jsonify({
            'success': True,
            'stats': stats
        })
    except Exception as e:
        logger.error(f"Error retrieving user stats: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Sahayak API is running',
        'timestamp': time.time(),
        'version': '2.0.0'
    })

# Serve React app
@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_react_routes(path):
    if path.startswith('api/'):
        return jsonify({'error': 'API endpoint not found'}), 404
    
    # Check if file exists in static folder
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    
    # For React Router, serve index.html for all other routes
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

